class Review < ApplicationRecord
  belongs_to :location
  belongs_to :content_creator
  has_many :review_notes, dependent: :destroy

  enum :rating, {
    avoid: 0,
    worth_if_nearby: 1,
    worth_a_detour: 2,
    worth_a_special_trip: 3
  }

  enum :source_type, {
    youtube: 0,
    tiktok: 1
  }

  validates :source_url, presence: true
  validates :rating, presence: true
  validates :source_type, presence: true
end