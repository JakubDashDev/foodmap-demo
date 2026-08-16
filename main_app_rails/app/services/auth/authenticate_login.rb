module Auth
  class AuthenticateLogin

    def initialize(email:, password:)
      @email = email.to_s
      @password = password
    end

    def call
      admin_user = AdminUser.find_by(email: @email)
      return unauthorized unless admin_user&.authenticate(@password)

      refresh_token = RefreshToken.generate_for(admin_user)
      {
        status: :ok,
        admin_user: admin_user,
        auth_token: Auth::JsonWebToken.encode(admin_user),
        raw_refresh_token: refresh_token[:raw_token]
      }
    end

    private
    def unauthorized
      { status: :unauthorized }
    end
  end
end