class AdminUser < ApplicationRecord
  has_secure_password

  has_many :refresh_tokens, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true
  normalizes :email, with: ->(email) { email.strip.downcase }
end