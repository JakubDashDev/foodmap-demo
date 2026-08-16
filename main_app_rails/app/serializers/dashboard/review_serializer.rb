module Dashboard
  class ReviewSerializer < Oj::Serializer
    attributes :id, :source_url, :source_type, :rating, :description, :published_at,
               :location_id, :content_creator_id
  end
end
