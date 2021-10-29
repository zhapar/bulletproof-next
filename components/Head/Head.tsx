import NextHead from 'next/head'

type HeadProp = {
  title?: string
  description?: string
}

export const Head = ({ title = '', description = '' }: HeadProp = {}) => {
  return (
    <NextHead>
      <title>
        {title ? `${title} | Bulletproof Next.js` : 'Bulletproof Next.js'}
      </title>
      <meta name="description" content={description} />
    </NextHead>
  )
}
