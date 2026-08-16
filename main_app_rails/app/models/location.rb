class Location < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :address }
  validates :address, presence: true
  validates :longitude, presence: true
  validates :latitude, presence: true

  has_many :reviews, dependent: :destroy
end