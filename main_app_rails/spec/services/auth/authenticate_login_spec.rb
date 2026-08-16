require 'rails_helper'

RSpec.describe Auth::AuthenticateLogin do
  describe '#call' do
    it 'returns ok with an admin_user, auth_token, and raw_refresh_token on correct credentials' do
      admin_user = create(:admin_user, email: 'login@example.com', password: 'correct-password')

      result = described_class.new(email: 'login@example.com', password: 'correct-password').call

      expect(result[:status]).to eq(:ok)
      expect(result[:admin_user]).to eq(admin_user)
      expect(result[:auth_token]).to be_present
      expect(result[:raw_refresh_token]).to be_present
    end

    it 'returns unauthorized for the wrong password' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')

      result = described_class.new(email: 'login@example.com', password: 'wrong-password').call

      expect(result[:status]).to eq(:unauthorized)
    end

    it 'returns unauthorized for an email that does not exist' do
      result = described_class.new(email: 'nobody@example.com', password: 'whatever').call

      expect(result[:status]).to eq(:unauthorized)
    end

    it 'issues a token whose payload matches the authenticated admin_user' do
      admin_user = create(:admin_user, email: 'login@example.com', password: 'correct-password')

      result = described_class.new(email: 'login@example.com', password: 'correct-password').call
      decoded = Auth::JsonWebToken.decode(result[:auth_token])

      expect(decoded[:user_uuid]).to eq(admin_user.uuid)
    end

    it 'creates a persisted refresh token for the admin_user' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')

      expect {
        described_class.new(email: 'login@example.com', password: 'correct-password').call
      }.to change(RefreshToken, :count).by(1)
    end

    it 'does not create a refresh token when authentication fails' do
      create(:admin_user, email: 'login@example.com', password: 'correct-password')

      expect {
        described_class.new(email: 'login@example.com', password: 'wrong-password').call
      }.not_to change(RefreshToken, :count)
    end
  end
end
