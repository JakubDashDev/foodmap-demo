module Dashboard
  class BaseController < ApplicationController
    include ActionController::Cookies
    before_action :authenticate_request
    attr_reader :current_user

    private
    def authenticate_request
      token = cookies.encrypted[:auth_token]
      payload = Auth::JsonWebToken.decode(token) if token.present?

      if payload
        @current_user = AdminUser.find_by(uuid: payload[:user_uuid])
      end

      render json: { message: 'Unauthorized' }, status: :unauthorized unless current_user
    end
  end
end