FactoryBot.define do
  factory :refresh_token do
    association :admin_user
    family_uuid { SecureRandom.uuid }
    token_digest { SecureRandom.hex(32) }
    expires_at { 7.days.from_now }
  end
end
