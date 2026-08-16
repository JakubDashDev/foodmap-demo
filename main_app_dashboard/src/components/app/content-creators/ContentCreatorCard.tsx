import { useNavigate } from 'react-router'
import { HiOutlineUserCircle } from 'react-icons/hi2'

import { Badge } from '@/components/common/Badge'
import { Card } from '@/components/common/Card'
import { Typography } from '@/components/common/Typography'
import type { ContentCreator } from '@/features/content-creators/types'

export interface ContentCreatorCardProps {
  contentCreator: ContentCreator
}

export function ContentCreatorCard({ contentCreator }: ContentCreatorCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className="flex cursor-pointer flex-col items-center gap-3 text-center transition-colors hover:bg-gray-50"
      onClick={() => navigate(`/content-creators/${contentCreator.id}/edit`)}
    >
      {contentCreator.avatarUrl ? (
        <img
          src={contentCreator.avatarUrl}
          alt={contentCreator.name}
          className="size-16 rounded-full object-cover"
        />
      ) : (
        <HiOutlineUserCircle className="size-16 text-gray-300" />
      )}

      <div>
        <Typography variant="subtitle1">{contentCreator.name}</Typography>
        {contentCreator.channelUrl ? (
          <a
            href={contentCreator.channelUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="block text-sm text-primary-600 hover:underline"
          >
            {contentCreator.channelUrl.replace(/^https?:\/\//, '')}
          </a>
        ) : null}
      </div>

      {contentCreator.description ? (
        <Typography variant="body2" className="line-clamp-2 text-gray-500">
          {contentCreator.description}
        </Typography>
      ) : null}

      <Badge tone="primary">{contentCreator.reviewCount} reviews</Badge>
    </Card>
  )
}
