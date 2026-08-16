require 'rails_helper'

RSpec.describe RefreshToken, type: :model do
  it 'is valid with an admin_user, family_uuid, token_digest, and expires_at' do
    expect(build(:refresh_token)).to be_valid
  end

  it 'is invalid without an admin_user' do
    expect(build(:refresh_token, admin_user: nil)).not_to be_valid
  end

  it 'is invalid without a family_uuid' do
    expect(build(:refresh_token, family_uuid: nil)).not_to be_valid
  end

  it 'is invalid without a token_digest' do
    expect(build(:refresh_token, token_digest: nil)).not_to be_valid
  end

  it 'is invalid without expires_at' do
    expect(build(:refresh_token, expires_at: nil)).not_to be_valid
  end

  describe '.generate_for' do
    it 'creates a persisted token and returns both the raw token and the record' do
      admin_user = create(:admin_user)

      result = RefreshToken.generate_for(admin_user)

      expect(result[:token]).to be_persisted
      expect(result[:token].admin_user).to eq(admin_user)
      expect(result[:raw_token]).to be_a(String)
    end

    it 'never stores the raw token itself, only its digest' do
      admin_user = create(:admin_user)

      result = RefreshToken.generate_for(admin_user)

      expect(result[:token].token_digest).not_to eq(result[:raw_token])
      expect(result[:token].token_digest).to eq(Digest::SHA256.hexdigest(result[:raw_token]))
    end

    it 'assigns a new family_uuid by default' do
      admin_user = create(:admin_user)

      result1 = RefreshToken.generate_for(admin_user)
      result2 = RefreshToken.generate_for(admin_user)

      expect(result1[:token].family_uuid).not_to eq(result2[:token].family_uuid)
    end

    it 'reuses the given family_uuid when one is passed' do
      admin_user = create(:admin_user)
      first = RefreshToken.generate_for(admin_user)

      second = RefreshToken.generate_for(admin_user, family_uuid: first[:token].family_uuid)

      expect(second[:token].family_uuid).to eq(first[:token].family_uuid)
    end
  end

  describe '.find_by_raw_token' do
    it 'finds the matching record by hashing the raw token' do
      admin_user = create(:admin_user)
      result = RefreshToken.generate_for(admin_user)

      found = RefreshToken.find_by_raw_token(result[:raw_token])

      expect(found).to eq(result[:token])
    end

    it 'returns nil for a raw token that does not match anything' do
      expect(RefreshToken.find_by_raw_token('not-a-real-token')).to be_nil
    end

    it 'returns nil for a blank raw token' do
      expect(RefreshToken.find_by_raw_token(nil)).to be_nil
      expect(RefreshToken.find_by_raw_token('')).to be_nil
    end
  end

  describe '.invalidate_family!' do
    it 'marks every token in the family as used' do
      admin_user = create(:admin_user)
      first = RefreshToken.generate_for(admin_user)
      second = RefreshToken.generate_for(admin_user, family_uuid: first[:token].family_uuid)

      RefreshToken.invalidate_family!(first[:token].family_uuid)

      expect(first[:token].reload.used?).to be true
      expect(second[:token].reload.used?).to be true
    end

    it 'does not affect tokens in a different family' do
      admin_user = create(:admin_user)
      target_family = RefreshToken.generate_for(admin_user)
      other_family = RefreshToken.generate_for(admin_user)

      RefreshToken.invalidate_family!(target_family[:token].family_uuid)

      expect(other_family[:token].reload.used?).to be false
    end

    it 'returns false when the family does not exist' do
      expect(RefreshToken.invalidate_family!(SecureRandom.uuid)).to be false
    end
  end

  describe '#expired?' do
    it 'is true when expires_at is in the past' do
      token = build(:refresh_token, expires_at: 1.day.ago)
      expect(token.expired?).to be true
    end

    it 'is false when expires_at is in the future' do
      token = build(:refresh_token, expires_at: 1.day.from_now)
      expect(token.expired?).to be false
    end
  end

  describe '#used?' do
    it 'is false when used_at is nil' do
      expect(build(:refresh_token, used_at: nil).used?).to be false
    end

    it 'is true when used_at is set' do
      expect(build(:refresh_token, used_at: Time.current).used?).to be true
    end
  end

  describe '#use!' do
    it 'sets used_at to the current time' do
      token = create(:refresh_token)
      expect { token.use! }.to change { token.used_at }.from(nil)
    end
  end

  it 'does not expose .digest as a public class method' do
    expect { RefreshToken.digest('anything') }.to raise_error(NoMethodError)
  end
end
