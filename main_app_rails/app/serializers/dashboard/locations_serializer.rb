module Dashboard
  class LocationsSerializer < Oj::Serializer
    attributes :id, :name, :address, :cuisine_type

    attribute :review_count do
      @object.reviews.size
    end
  end
end
