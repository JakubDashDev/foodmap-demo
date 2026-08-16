class RefreshToken < ApplicationRecord
  belongs_to :admin_user

  validates :token_digest, :family_uuid, :expires_at, presence: true

  def self.generate_for(user, family_uuid: SecureRandom.uuid)
    raw_token = SecureRandom.hex(32)

    token = create!(
      admin_user: user,
      family_uuid: family_uuid,
      token_digest: digest(raw_token),
      expires_at: 7.days.from_now
    )

    { raw_token: raw_token, token: token }
  end

  def self.find_by_raw_token(raw_token)
    find_by(token_digest: digest(raw_token)) if raw_token.present?
  end

  def self.invalidate_family!(family_uuid)
    token = find_by(family_uuid: family_uuid)
    return false unless token

    token.admin_user.with_lock do
      where(family_uuid: family_uuid).update_all(used_at: Time.current)
    end
  end

  def self.invalidate_family_by_raw_token!(raw_token)
    token = find_by_raw_token(raw_token)
    return false unless token

    invalidate_family!(token.family_uuid)
    true
  end

  def expired?
    expires_at < Time.current
  end

  def used?
    used_at.present?
  end

  def use!
    update!(used_at: Time.current)
  end

  def self.digest(raw_token)
    Digest::SHA256.hexdigest(raw_token)
  end
  private_class_method :digest
end