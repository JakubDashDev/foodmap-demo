module Dashboard
  class LocationsController < BaseController
    def index
      result = Locations::Index.new(search_params).call

      render json: {
        data: Dashboard::LocationsSerializer.many(result[:locations]),
        meta: result[:meta]
      }
    end

    def show
      render json: Dashboard::LocationSerializer.one(location)
    end

    def create
      location = Location.new(location_params)

      if location.save
        render json: Dashboard::LocationSerializer.one(location), status: :created
      else
        render json: { message: "Validation failed", errors: location.errors }, status: :unprocessable_entity
      end
    end

    def update
      if location.update(location_params)
        render json: Dashboard::LocationSerializer.one(location)
      else
        render json: { message: "Validation failed", errors: location.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      location.destroy!
      head :no_content
    end

    private

    def location
      @location ||= Location.find(params[:id])
    end

    def location_params
      params.require(:location).permit(:name, :address, :cuisine_type, :description, :latitude, :longitude)
    end

    def search_params
      params.permit(:query, :sort_by, :page, :page_size).to_h
    end
  end
end
