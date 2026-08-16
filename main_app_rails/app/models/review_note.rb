class ReviewNote < ApplicationRecord
  belongs_to :review

  validates :description, presence: true
end