module Auth
  class RotateRefreshToken
    def initialize(raw_token:)
      @raw_token = raw_token
    end

    def call
      refresh_token = RefreshToken.find_by_raw_token(@raw_token)

      return unauthorized unless refresh_token

      refresh_token.admin_user.with_lock do
        if refresh_token.expired? || refresh_token.used?
          RefreshToken.invalidate_family!(refresh_token.family_uuid)
          next unauthorized
        end

        admin_user = refresh_token.admin_user

        unless admin_user
          RefreshToken.invalidate_family!(refresh_token.family_uuid)
          next unauthorized
        end

        refresh_token.use!
        fresh_token = RefreshToken.generate_for(admin_user, family_uuid: refresh_token.family_uuid)

        {
          status: :ok,
          admin_user: admin_user,
          auth_token: Auth::JsonWebToken.encode(admin_user),
          raw_refresh_token: fresh_token[:raw_token]
        }
      end
    end

    private
    def unauthorized
      { status: :unauthorized }
    end
  end
end