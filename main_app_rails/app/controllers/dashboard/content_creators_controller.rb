module Dashboard
  class ContentCreatorsController < BaseController
    def index
      result = ContentCreators::Index.new(search_params).call

      render json: {
        data: Dashboard::ContentCreatorsSerializer.many(result[:content_creators]),
        meta: result[:meta]
      }
    end

    def show
      render json: Dashboard::ContentCreatorsSerializer.one(content_creator)
    end

    def create
      content_creator = ContentCreator.new(content_creator_params)

      if content_creator.save
        render json: Dashboard::ContentCreatorsSerializer.one(content_creator), status: :created
      else
        render json: { message: "Validation failed", errors: content_creator.errors },
               status: :unprocessable_entity
      end
    end

    def update
      if content_creator.update(content_creator_params)
        render json: Dashboard::ContentCreatorsSerializer.one(content_creator)
      else
        render json: { message: "Validation failed", errors: content_creator.errors },
               status: :unprocessable_entity
      end
    end

    def destroy
      content_creator.destroy!
      head :no_content
    end

    private

    def content_creator
      @content_creator ||= ContentCreator.find(params[:id])
    end

    def content_creator_params
      params.require(:content_creator).permit(:name, :channel_url, :avatar_url, :description)
    end

    def search_params
      params.permit(:query, :sort_by, :page, :page_size).to_h
    end
  end
end
