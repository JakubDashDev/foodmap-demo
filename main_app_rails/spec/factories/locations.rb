FactoryBot.define do
  factory :location do
    sequence(:name) { |n| "Location #{n}" }
    sequence(:address) { |n| "Main St #{n}" }
    latitude { 52.2297 }
    longitude { 21.0122 }
    cuisine_type { "Italian" }
    description { "A cozy neighborhood spot." }
  end
end
