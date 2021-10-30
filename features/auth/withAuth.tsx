import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import storage from '@/utils/storage'

export const withAuth = (WrappedComponent: ReactNode) => {
  return Object.assign(
    (props: object) => {
      // checks whether we are on client / browser or server.
      if (typeof window !== 'undefined') {
        const Router = useRouter()

        const accessToken = storage.getToken()

        // If there is no access token we redirect to "/" page.
        if (!accessToken) {
          Router.replace('/auth/login')
          return null
        }

        // If this is an accessToken we just render the component that was passed with all its props

        return <WrappedComponent {...props} />
      }

      // If we are on server, return null
      return null
    },
    { displayName: 'withAuth' }
  )
}
