module Dashboard
  class ContentCreatorsSerializer < Oj::Serializer
    attributes :id, :name, :channel_url, :avatar_url, :description

    attribute :review_count do
      @object.reviews.size
    end
  end
end
