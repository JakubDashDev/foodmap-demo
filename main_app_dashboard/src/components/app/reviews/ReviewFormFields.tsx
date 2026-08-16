import { useState } from 'react'
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form'

import { Combobox } from '@/components/common/Combobox'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Textarea } from '@/components/common/Textarea'
import { CreateLocationModal } from '@/components/app/locations/CreateLocationModal'
import { CreateContentCreatorModal } from '@/components/app/content-creators/CreateContentCreatorModal'
import { RATING_COLORS, RATING_LABELS } from '@/components/app/reviews/ratingColors'
import { useLocationsQuery } from '@/features/locations/api'
import { useContentCreatorsQuery } from '@/features/content-creators/api'
import type { Review } from '@/features/reviews/types'
import type { ReviewFormValues } from '@/components/app/reviews/reviewFormSchema'

const SOURCE_TYPE_OPTIONS = [
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
]

const RATING_OPTIONS = (Object.keys(RATING_LABELS) as Review['rating'][]).map((rating) => ({
  label: RATING_LABELS[rating],
  value: rating,
  color: RATING_COLORS[rating],
}))

export interface ReviewFormFieldsProps {
  register: UseFormRegister<ReviewFormValues>
  control: Control<ReviewFormValues>
  setValue: UseFormSetValue<ReviewFormValues>
  errors: FieldErrors<ReviewFormValues>
}

export function ReviewFormFields({ register, control, setValue, errors }: ReviewFormFieldsProps) {
  const { data: locationsData } = useLocationsQuery({ sort_by: 'name-asc' })
  const { data: contentCreatorsData } = useContentCreatorsQuery({ sort_by: 'name-asc' })

  const [newLocationQuery, setNewLocationQuery] = useState<string | null>(null)
  const [newContentCreatorQuery, setNewContentCreatorQuery] = useState<string | null>(null)

  const locationOptions =
    locationsData?.data.map((location) => ({
      label: location.name,
      value: String(location.id),
    })) ?? []

  const contentCreatorOptions =
    contentCreatorsData?.data.map((contentCreator) => ({
      label: contentCreator.name,
      value: String(contentCreator.id),
    })) ?? []

  return (
    <>
      <Input
        id="source_url"
        label="Source URL"
        error={errors.source_url?.message}
        {...register('source_url')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="source_type"
          control={control}
          render={({ field }) => (
            <Select
              label="Source type"
              options={SOURCE_TYPE_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.source_type?.message}
            />
          )}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Select
              label="Rating"
              options={RATING_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.rating?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="location_id"
          control={control}
          render={({ field }) => (
            <Combobox
              label="Location"
              placeholder="Search locations…"
              options={locationOptions}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.location_id?.message}
              onCreateNew={setNewLocationQuery}
            />
          )}
        />

        <Controller
          name="content_creator_id"
          control={control}
          render={({ field }) => (
            <Combobox
              label="Content creator"
              placeholder="Search creators…"
              options={contentCreatorOptions}
              value={field.value}
              onValueChange={field.onChange}
              error={errors.content_creator_id?.message}
              onCreateNew={setNewContentCreatorQuery}
            />
          )}
        />
      </div>

      <Input
        id="published_at"
        type="date"
        label="Published at"
        error={errors.published_at?.message}
        {...register('published_at')}
      />

      <Textarea
        id="description"
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />

      <CreateLocationModal
        open={newLocationQuery !== null}
        onOpenChange={(open) => {
          if (!open) {
            setNewLocationQuery(null)
          }
        }}
        initialName={newLocationQuery ?? undefined}
        onCreated={(location) => {
          setValue('location_id', String(location.id), { shouldValidate: true })
          setNewLocationQuery(null)
        }}
      />

      <CreateContentCreatorModal
        open={newContentCreatorQuery !== null}
        onOpenChange={(open) => {
          if (!open) {
            setNewContentCreatorQuery(null)
          }
        }}
        initialName={newContentCreatorQuery ?? undefined}
        onCreated={(contentCreator) => {
          setValue('content_creator_id', String(contentCreator.id), { shouldValidate: true })
          setNewContentCreatorQuery(null)
        }}
      />
    </>
  )
}
