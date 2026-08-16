require 'rails_helper'

RSpec.describe Review, type: :model do
  it 'is valid with a location, content_creator, source_url, rating, and source_type' do
    review = build(:review)
    expect(review).to be_valid
  end

  it 'is invalid without a location' do
    review = build(:review, location: nil)
    expect(review).not_to be_valid
  end

  it 'is invalid without a content_creator' do
    review = build(:review, content_creator: nil)
    expect(review).not_to be_valid
  end

  it 'is invalid without a source_url' do
    review = build(:review, source_url: nil)
    expect(review).not_to be_valid
  end

  it 'is invalid without a rating' do
    review = build(:review, rating: nil)
    expect(review).not_to be_valid
  end

  it 'is invalid without a source_type' do
    review = build(:review, source_type: nil)
    expect(review).not_to be_valid
  end

  it 'exposes rating predicate methods from the enum' do
    review = build(:review, rating: :worth_a_special_trip)
    expect(review.worth_a_special_trip?).to be true
    expect(review.avoid?).to be false
  end

  it 'exposes source_type predicate methods from the enum' do
    review = build(:review, source_type: :tiktok)
    expect(review.tiktok?).to be true
    expect(review.youtube?).to be false
  end

  it 'destroys its reviews when the location is destroyed' do
    review = create(:review)
    expect { review.location.destroy }.to change(Review, :count).by(-1)
  end

  it 'destroys its reviews when the content_creator is destroyed' do
    review = create(:review)
    expect { review.content_creator.destroy }.to change(Review, :count).by(-1)
  end
end
