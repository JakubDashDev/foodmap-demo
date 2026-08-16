require 'rails_helper'

RSpec.describe ReviewNote, type: :model do
  it 'is invalid without description' do
    review_note = build(:review_note, description: nil)
    expect(review_note).not_to be_valid
  end
end