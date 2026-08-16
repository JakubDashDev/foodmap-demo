require 'rails_helper'

RSpec.describe Auth::JsonWebToken do
  describe '.encode' do
    it 'produces a well-formed JWT (three dot-separated segments)' do
      admin_user = create(:admin_user)

      token = described_class.encode(admin_user)

      expect(token.split('.').length).to eq(3)
    end
  end

  describe '.decode' do
    it 'round-trips the admin_user uuid through encode/decode' do
      admin_user = create(:admin_user)

      token = described_class.encode(admin_user)
      decoded = described_class.decode(token)

      expect(decoded[:user_uuid]).to eq(admin_user.uuid)
    end

    it 'includes an exp claim' do
      admin_user = create(:admin_user)

      decoded = described_class.decode(described_class.encode(admin_user))

      expect(decoded[:exp]).to be_present
    end

    it 'returns nil for a garbage token' do
      expect(described_class.decode('not.a.token')).to be_nil
    end

    it 'returns nil for an expired token' do
      expired_payload = { user_uuid: SecureRandom.uuid, exp: 1.hour.ago.to_i }
      expired_token = JWT.encode(expired_payload, described_class::SECRET_KEY, 'HS256')

      expect(described_class.decode(expired_token)).to be_nil
    end
  end
end
