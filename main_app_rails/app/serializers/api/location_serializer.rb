module Api
  class LocationSerializer < Oj::Serializer
    attributes :id, :name, :address, :cuisine_type, :description, :latitude, :longitude

    has_many :reviews, serializer: Api::LocationReviewSerializer do
      @object.reviews.order(published_at: :desc)
    end
  end
end
