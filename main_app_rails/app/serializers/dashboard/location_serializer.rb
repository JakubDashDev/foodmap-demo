module Dashboard
  class LocationSerializer < Oj::Serializer
    attributes :id, :name, :address, :cuisine_type, :description, :latitude, :longitude
  end
end
