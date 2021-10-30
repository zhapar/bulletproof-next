import { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  UseFormProps,
} from 'react-hook-form'
import { ZodType, ZodTypeDef } from 'zod'
import clsx from 'clsx'

type FormProps<TFormValues, Schema> = {
  className?: string
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
  options?: UseFormProps
  id?: string
  schema: Schema
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  })

  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}>
      {children(methods)}
    </form>
  )
}
