import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode } from 'react'

type LinkProps = NextLinkProps & {
  className?: string
  children: ReactNode
}

export const Link = ({ href, className, children, ...props }: LinkProps) => {
  return (
    <NextLink href={href} {...props}>
      <a className={clsx('text-indigo-600 hover:text-indigo-900', className)}>
        {children}
      </a>
    </NextLink>
  )
}
