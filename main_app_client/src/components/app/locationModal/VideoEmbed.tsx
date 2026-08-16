import type { LocationReview } from '@/features/locations/types'
import { getYoutubeEmbedUrl } from '@/components/app/locationModal/youtube'

export interface VideoEmbedProps {
  review: LocationReview
}

export function VideoEmbed({ review }: VideoEmbedProps) {
  const embedUrl = review.sourceType === 'youtube' ? getYoutubeEmbedUrl(review.sourceUrl) : null

  if (!embedUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-800 text-sm text-gray-400">
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-200"
        >
          Zobacz materiał źródłowy
        </a>
      </div>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <iframe
        key={embedUrl}
        src={embedUrl}
        title={review.contentCreatorName}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
