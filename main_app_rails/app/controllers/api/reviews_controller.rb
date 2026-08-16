module Api
  class ReviewsController < BaseController
    def index
      result = Reviews::Index.new(search_params).call

      render json: {
        data: Api::ReviewsSerializer.many(result[:reviews]),
        meta: result[:meta]
      }
    end

    private

    def search_params
      params.permit(:query, :sort_by, :page, :page_size, :sw_lat, :sw_lng, :ne_lat, :ne_lng).to_h
    end
  end
end
