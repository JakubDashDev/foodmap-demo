import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import type { ContentCreatorFormValues } from '@/components/app/content-creators/contentCreatorFormSchema'

export interface ContentCreatorFormFieldsProps {
  register: UseFormRegister<ContentCreatorFormValues>
  errors: FieldErrors<ContentCreatorFormValues>
}

export function ContentCreatorFormFields({ register, errors }: ContentCreatorFormFieldsProps) {
  return (
    <>
      <Input id="name" label="Name" error={errors.name?.message} {...register('name')} />

      <Input
        id="channel_url"
        label="Channel URL"
        error={errors.channel_url?.message}
        {...register('channel_url')}
      />

      <Input
        id="avatar_url"
        label="Avatar URL"
        error={errors.avatar_url?.message}
        {...register('avatar_url')}
      />

      <Textarea
        id="description"
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />
    </>
  )
}
