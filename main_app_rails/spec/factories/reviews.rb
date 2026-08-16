FactoryBot.define do
  factory :review do
    association :location
    association :content_creator
    source_url { "https://youtube.com/watch?v=abc123" }
    source_type { :youtube }
    rating { :worth_a_detour }
    description { "Solid pierogi, mediocre service." }
    published_at { Time.current }
  end
end
