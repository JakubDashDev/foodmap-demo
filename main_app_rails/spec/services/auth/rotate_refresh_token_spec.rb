require 'rails_helper'

RSpec.describe Auth::RotateRefreshToken do
  describe '#call' do
    it 'returns ok with the same admin_user and a new raw_refresh_token for a valid token' do
      admin_user = create(:admin_user)
      initial = RefreshToken.generate_for(admin_user)

      result = described_class.new(raw_token: initial[:raw_token]).call

      expect(result[:status]).to eq(:ok)
      expect(result[:admin_user]).to eq(admin_user)
      expect(result[:raw_refresh_token]).to be_present
      expect(result[:raw_refresh_token]).not_to eq(initial[:raw_token])
    end

    it 'marks the used token as used' do
      admin_user = create(:admin_user)
      initial = RefreshToken.generate_for(admin_user)

      described_class.new(raw_token: initial[:raw_token]).call

      expect(initial[:token].reload.used?).to be true
    end

    it 'keeps the new token in the same family as the one it rotated from' do
      admin_user = create(:admin_user)
      initial = RefreshToken.generate_for(admin_user)

      result = described_class.new(raw_token: initial[:raw_token]).call

      new_token = RefreshToken.find_by_raw_token(result[:raw_refresh_token])
      expect(new_token.family_uuid).to eq(initial[:token].family_uuid)
    end

    it 'returns unauthorized for a token that does not exist' do
      result = described_class.new(raw_token: 'not-a-real-token').call

      expect(result[:status]).to eq(:unauthorized)
    end

    it 'returns unauthorized for an expired token and invalidates its family' do
      admin_user = create(:admin_user)
      initial = RefreshToken.generate_for(admin_user)
      initial[:token].update!(expires_at: 1.hour.ago)

      result = described_class.new(raw_token: initial[:raw_token]).call

      expect(result[:status]).to eq(:unauthorized)
      expect(initial[:token].reload.used?).to be true
    end

    it 'detects reuse of an already-used token and invalidates the entire family' do
      admin_user = create(:admin_user)
      initial = RefreshToken.generate_for(admin_user)

      first_use = described_class.new(raw_token: initial[:raw_token]).call
      reuse = described_class.new(raw_token: initial[:raw_token]).call

      expect(reuse[:status]).to eq(:unauthorized)

      fresh_token = RefreshToken.find_by_raw_token(first_use[:raw_refresh_token])
      expect(fresh_token.used?).to be true
    end

    it 'does not affect a different family belonging to the same admin_user' do
      admin_user = create(:admin_user)
      family_a = RefreshToken.generate_for(admin_user)
      family_b = RefreshToken.generate_for(admin_user)

      described_class.new(raw_token: family_a[:raw_token]).call
      described_class.new(raw_token: family_a[:raw_token]).call # reuse, kills family A

      expect(family_b[:token].reload.used?).to be false
    end
  end
end
