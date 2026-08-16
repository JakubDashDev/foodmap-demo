require 'rails_helper'

RSpec.describe 'Dashboard::Authentications', type: :request do
  def json_body
    JSON.parse(response.body)
  end

  describe 'POST /dashboard/login' do
    it 'returns ok, the admin_user, and sets both cookies with correct credentials' do
      admin_user = create(:admin_user, email: 'login@example.com', password: 'correct-password')

      post '/dashboard/login', params: { email: 'login@example.com', password: 'correct-password' }, as: :json

      expect(response).to have_http_status(:ok)
      expect(json_body['admin_user']['uuid']).to eq(admin_user.uuid)
      expect(json_body['admin_user']).not_to have_key('password_digest')
      expect(cookies[:auth_token]).to be_present
      expect(cookies[:refresh_token]).to be_present
    end

    it 'returns unauthorized for the wrong password' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')

      post '/dashboard/login', params: { email: 'login@example.com', password: 'wrong' }, as: :json

      expect(response).to have_http_status(:unauthorized)
      expect(cookies[:auth_token]).to be_blank
    end

    it 'returns unauthorized for an email that does not exist' do
      post '/dashboard/login', params: { email: 'nobody@example.com', password: 'whatever' }, as: :json

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'GET /dashboard/me' do
    it 'returns the current admin_user when authenticated' do
      admin_user = create(:admin_user, email: 'login@example.com', password: 'correct-password')
      post '/dashboard/login', params: { email: 'login@example.com', password: 'correct-password' }, as: :json

      get '/dashboard/me'

      expect(response).to have_http_status(:ok)
      expect(json_body['admin_user']['uuid']).to eq(admin_user.uuid)
    end

    it 'returns unauthorized without a cookie' do
      get '/dashboard/me'

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'POST /dashboard/refresh' do
    it 'issues a new refresh cookie and keeps the session valid' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')
      post '/dashboard/login', params: { email: 'login@example.com', password: 'correct-password' }, as: :json
      original_refresh_cookie = cookies[:refresh_token]

      post '/dashboard/refresh'

      expect(response).to have_http_status(:ok)
      expect(cookies[:refresh_token]).not_to eq(original_refresh_cookie)

      get '/dashboard/me'
      expect(response).to have_http_status(:ok)
    end

    it 'returns unauthorized without a refresh cookie' do
      post '/dashboard/refresh'

      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns unauthorized and clears cookies when the refresh token was already used' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')
      post '/dashboard/login', params: { email: 'login@example.com', password: 'correct-password' }, as: :json
      original_refresh_cookie = cookies[:refresh_token]

      post '/dashboard/refresh' # rotates — original cookie is now spent
      cookies[:refresh_token] = original_refresh_cookie # force the old, spent cookie back
      post '/dashboard/refresh' # reuse attempt

      expect(response).to have_http_status(:unauthorized)

      get '/dashboard/me'
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'POST /dashboard/logout' do
    it 'clears cookies so subsequent requests are unauthorized' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')
      post '/dashboard/login', params: { email: 'login@example.com', password: 'correct-password' }, as: :json

      post '/dashboard/logout'

      expect(response).to have_http_status(:ok)

      get '/dashboard/me'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
