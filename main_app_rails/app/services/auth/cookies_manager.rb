module Auth
  class CookiesManager
    def initialize(cookies)
      @cookies = cookies
    end

    def set_authentication(auth_token:, raw_refresh_token:)
      set_cookie(key: :auth_token, value: auth_token, expires: 15.minutes.from_now)
      set_cookie(key: :refresh_token, value: raw_refresh_token, expires: 7.days.from_now)
    end

    def clear
      %i[auth_token refresh_token].each do |key|
        @cookies.delete(key, secure: secure_cookie?, same_site: :strict)
      end
    end

    private
    def set_cookie(key:, value:, expires:)
      @cookies.encrypted[key] = {
        value: value,
        expires: expires,
        httponly: true,
        secure: secure_cookie?,
        same_site: :strict
      }
    end

    def secure_cookie?
      Rails.env.production?
    end
  end
end