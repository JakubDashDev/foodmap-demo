import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import type { LocationFormValues } from '@/components/app/locations/locationFormSchema'

export interface LocationFormFieldsProps {
  register: UseFormRegister<LocationFormValues>
  errors: FieldErrors<LocationFormValues>
}

export function LocationFormFields({ register, errors }: LocationFormFieldsProps) {
  return (
    <>
      <Input id="name" label="Name" error={errors.name?.message} {...register('name')} />

      <Input
        id="address"
        label="Address"
        error={errors.address?.message}
        {...register('address')}
      />

      <Input
        id="cuisine_type"
        label="Cuisine type"
        error={errors.cuisine_type?.message}
        {...register('cuisine_type')}
      />

      <Textarea
        id="description"
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="latitude"
          label="Latitude"
          error={errors.latitude?.message}
          {...register('latitude')}
        />
        <Input
          id="longitude"
          label="Longitude"
          error={errors.longitude?.message}
          {...register('longitude')}
        />
      </div>
    </>
  )
}
