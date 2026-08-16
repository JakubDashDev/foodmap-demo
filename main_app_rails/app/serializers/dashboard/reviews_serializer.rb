module Dashboard
  class ReviewsSerializer < Oj::Serializer
    attributes :id, :source_url, :source_type, :rating, :published_at

    attribute :location_name do
      @object.location.name
    end

    attribute :content_creator_name do
      @object.content_creator.name
    end
  end
end
