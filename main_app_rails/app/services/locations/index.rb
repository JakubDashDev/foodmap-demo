module Locations
  class Index
    DEFAULT_PAGE_SIZE = 20
    MAX_PAGE_SIZE = 100

    def initialize(search_params)
      @search_params = search_params
    end

    def call
      relation = Locations::Query.new(
        scope: Location.includes(:reviews),
        query: @search_params[:query],
        sort_by: @search_params[:sort_by]
      ).call

      total_count = relation.count

      {
        locations: relation.limit(page_size).offset(offset),
        meta: {
          page: page,
          page_size: page_size,
          total_count: total_count,
          total_pages: total_pages(total_count),
          next_page: next_page(total_count)
        }
      }
    end

    private

    def page
      @page ||= [@search_params[:page].to_i, 1].max
    end

    def page_size
      @page_size ||= begin
        value = @search_params[:page_size].to_i
        value = DEFAULT_PAGE_SIZE if value <= 0
        value.clamp(1, MAX_PAGE_SIZE)
      end
    end

    def offset
      (page - 1) * page_size
    end

    def total_pages(total_count)
      (total_count / page_size.to_f).ceil
    end

    def next_page(total_count)
      page < total_pages(total_count) ? page + 1 : nil
    end
  end
end
