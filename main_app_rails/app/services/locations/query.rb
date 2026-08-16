module Locations
  class Query
    SORTABLE_COLUMNS = %w[name address cuisine_type].freeze
    SORT_DIRECTIONS = %w[asc desc].freeze
    DEFAULT_SORT = { name: :asc }.freeze

    def initialize(scope: Location.all, query: nil, sort_by: nil)
      @scope = scope
      @query = query
      @sort_by = sort_by
    end

    def call
      apply_sort(apply_search(@scope))
    end

    private

    def apply_search(relation)
      return relation if @query.blank?

      sanitized = "%#{@query}%"
      relation.where("name ILIKE :q OR address ILIKE :q", q: sanitized)
    end

    def apply_sort(relation)
      column, direction = @sort_by.to_s.split("-")

      unless SORTABLE_COLUMNS.include?(column) && SORT_DIRECTIONS.include?(direction)
        return relation.order(DEFAULT_SORT)
      end

      relation.order(column => direction.to_sym)
    end
  end
end
