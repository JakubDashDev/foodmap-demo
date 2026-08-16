class ContentCreator < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :channel_url, uniqueness: true, allow_nil: true

  has_many :reviews, dependent: :destroy
end