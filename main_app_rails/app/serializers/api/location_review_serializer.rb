module Api
  class LocationReviewSerializer < Oj::Serializer
    attributes :id, :source_url, :source_type, :rating, :description, :published_at

    attribute :content_creator_name do
      @object.content_creator.name
    end

    attribute :content_creator_avatar_url do
      @object.content_creator.avatar_url
    end
  end
end
