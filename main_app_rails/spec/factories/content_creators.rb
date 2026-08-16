FactoryBot.define do
  factory :content_creator do
    sequence(:name) { |n| "Content Creator #{n}" }
    sequence(:channel_url) { |n| "https://youtube.com/@creator#{n}" }
  end
end
