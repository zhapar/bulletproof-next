import { ReactNode } from 'react'
import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type Option = {
  label: ReactNode
  value: string | number | string[]
}

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[]
  className?: string
  defaultValue?: string
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>
}

export const SelectField = ({
  label,
  options,
  error,
  className,
  defaultValue,
  registration,
  placeholder,
}: SelectFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <select
        name="location"
        placeholder={placeholder}
        className={clsx(
          'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
          className
        )}
        defaultValue={defaultValue}
        {...registration}>
        {options.map(({ label, value }) => (
          <option value={value} key={label?.toString()}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}
