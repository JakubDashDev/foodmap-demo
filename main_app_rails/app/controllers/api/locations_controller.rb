module Api
  class LocationsController < BaseController
    def show
      render json: Api::LocationSerializer.one(Location.find(params[:id]))
    end
  end
end
