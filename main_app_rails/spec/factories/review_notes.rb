FactoryBot.define do
  factory :review_note do
    association :review
    description { "My new description" }
  end
end