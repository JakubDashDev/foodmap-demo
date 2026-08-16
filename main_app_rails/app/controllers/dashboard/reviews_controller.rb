module Dashboard
  class ReviewsController < BaseController
    def index
      result = Reviews::Index.new(search_params).call

      render json: {
        data: Dashboard::ReviewsSerializer.many(result[:reviews]),
        meta: result[:meta]
      }
    end

    def show
      render json: Dashboard::ReviewSerializer.one(review)
    end

    def create
      review = Review.new(review_params)

      if review.save
        render json: Dashboard::ReviewSerializer.one(review), status: :created
      else
        render json: { message: "Validation failed", errors: review.errors }, status: :unprocessable_entity
      end
    end

    def update
      if review.update(review_params)
        render json: Dashboard::ReviewSerializer.one(review)
      else
        render json: { message: "Validation failed", errors: review.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      review.destroy!
      head :no_content
    end

    private

    def review
      @review ||= Review.find(params[:id])
    end

    def review_params
      params.require(:review).permit(
        :source_url, :source_type, :rating, :description, :published_at,
        :location_id, :content_creator_id
      )
    end

    def search_params
      params.permit(:query, :sort_by, :page, :page_size).to_h
    end
  end
end
