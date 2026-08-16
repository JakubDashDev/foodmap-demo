module Reviews
  class Query
    SORTABLE_COLUMNS = {
      "location" => "locations.name",
      "content_creator" => "content_creators.name",
      "rating" => "reviews.rating",
      "published_at" => "reviews.published_at"
    }.freeze
    SORT_DIRECTIONS = %w[asc desc].freeze
    DEFAULT_SORT = "reviews.published_at DESC".freeze

    def initialize(scope:, query: nil, sort_by: nil, bounds: nil)
      @scope = scope
      @query = query
      @sort_by = sort_by
      @bounds = bounds
    end

    def call
      apply_sort(apply_bounds(apply_search(@scope)))
    end

    private

    def apply_search(relation)
      return relation if @query.blank?

      sanitized = "%#{@query}%"
      relation.where(
        "locations.name ILIKE :q OR locations.address ILIKE :q OR content_creators.name ILIKE :q",
        q: sanitized
      )
    end

    def apply_bounds(relation)
      return relation if @bounds.blank?

      sw_lat, sw_lng, ne_lat, ne_lng = @bounds.values_at(:sw_lat, :sw_lng, :ne_lat, :ne_lng)
      return relation if [sw_lat, sw_lng, ne_lat, ne_lng].any?(&:blank?)

      sw_lat, sw_lng, ne_lat, ne_lng = [sw_lat, sw_lng, ne_lat, ne_lng].map { |value| Float(value) }
      relation.where(locations: { latitude: sw_lat..ne_lat, longitude: sw_lng..ne_lng })
    end

    def apply_sort(relation)
      column, direction = @sort_by.to_s.split("-")
      sql_column = SORTABLE_COLUMNS[column]

      return relation.order(DEFAULT_SORT) unless sql_column && SORT_DIRECTIONS.include?(direction)

      relation.order(Arel.sql("#{sql_column} #{direction}"))
    end
  end
end
