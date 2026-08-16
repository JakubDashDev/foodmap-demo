import type { ILocationDto, Location } from './types'

export function mapLocation(dto: ILocationDto): Location {
  return {
    id: dto.id,
    name: dto.name,
    address: dto.address,
    cuisineType: dto.cuisine_type,
    description: dto.description,
    reviews: dto.reviews.map((review) => ({
      id: review.id,
      sourceUrl: review.source_url,
      sourceType: review.source_type,
      rating: review.rating,
      description: review.description,
      publishedAt: review.published_at,
      contentCreatorName: review.content_creator_name,
      contentCreatorAvatarUrl: review.content_creator_avatar_url,
    })),
  }
}
