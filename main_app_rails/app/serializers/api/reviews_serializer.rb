module Api
  class ReviewsSerializer < Oj::Serializer
    attributes :id, :source_url, :source_type, :rating, :published_at, :location_id

    attribute :location_name do
      @object.location.name
    end

    attribute :cuisine_type do
      @object.location.cuisine_type
    end

    attribute :latitude do
      @object.location.latitude
    end

    attribute :longitude do
      @object.location.longitude
    end

    attribute :content_creator_name do
      @object.content_creator.name
    end

    attribute :content_creator_avatar_url do
      @object.content_creator.avatar_url
    end
  end
end
