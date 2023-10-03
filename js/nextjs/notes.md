# createServerSideProps

```typescript
import { parse } from 'express-useragent'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { GetServerSidePropsResult } from 'next/types'
import { getFollowingPage } from 'shared/api'
import { Route } from 'shared/config'

type Context = Parameters<GetServerSideProps>[0]

export function createServerSideProps<T>(
    toSSP: (c: Context) => Promise<GetServerSidePropsResult<T>>,
): GetServerSideProps {
    return async (context) => {
        const result = await (toSSP(context) || Promise.resolve({}))

        if ('redirect' in result || 'notFound' in result) {
            return result
        }

        // Общая логика для всех getServerSideProps:
        const session = await getSession(context)
        const userDevice = parse(context.req.headers['user-agent'] || '')

        return {
            props: {
                ...result.props,
                session,
                userDevice,
            },
        }
    }
}

// Использование:

export const getServerSideProps = createServerSideProps(async (context) => {
  const { headers } = context.req
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['page', Route.Following], () => getFollowingPage({ headers }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})
```