module Auth
  class JsonWebToken
    SECRET_KEY = ENV.fetch("JWT_SECRET_KEY")

    def self.encode(admin_user)
      payload = {
        user_uuid: admin_user.uuid,
        exp: 15.minutes.from_now.to_i
      }

      JWT.encode(payload, SECRET_KEY, "HS256")
    end

    def self.decode(token)
      decoded = JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256').first
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError
      nil
    end
  end
end