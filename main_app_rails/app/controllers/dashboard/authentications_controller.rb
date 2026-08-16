module Dashboard
  class AuthenticationsController < BaseController
    skip_before_action :authenticate_request, only: %i[
      authenticate
      refresh
      logout
    ]

    def authenticate
      result = Auth::AuthenticateLogin.new(
        email: params[:email],
        password: params[:password]
      ).call

      return render json: { message: 'Unauthorized' }, status: :unauthorized unless result[:status] == :ok

      cookie_manager.set_authentication(
        auth_token: result[:auth_token],
        raw_refresh_token: result[:raw_refresh_token]
      )

      render json: AuthenticationSerializer.one(result[:admin_user], message: 'Authenticated')
    end

    def current
      render json: AuthenticationSerializer.one(current_user, message: 'Authenticated')
    end

    def refresh
      result = Auth::RotateRefreshToken.new(
        raw_token: cookies.encrypted[:refresh_token]
      ).call

      unless result[:status] == :ok
        cookie_manager.clear
        return render json: { message: 'Unauthorized' }, status: :unauthorized
      end

      cookie_manager.set_authentication(
        auth_token: result[:auth_token],
        raw_refresh_token: result[:raw_refresh_token]
      )
      render json: AuthenticationSerializer.one(result[:admin_user], message: 'Token refreshed')
    end

    def logout
      RefreshToken.invalidate_family_by_raw_token!(cookies.encrypted[:refresh_token])
      cookie_manager.clear

      render json: { message: 'Logged out' }
    end

    private
    def cookie_manager
      @cookie_manager ||= Auth::CookiesManager.new(cookies)
    end
  end
end