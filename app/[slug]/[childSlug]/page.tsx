import { getAuthClient, getClient } from '@faustwp/experimental-app-router'
import { gql } from '@apollo/client'
import { hasPreviewProps } from '../../hasPreviewProps'
import { PleaseLogin } from '@/components/please-login'

interface PageProps {
  params?: any
  searchParams?: any
}

export default async function Page(props: PageProps) {
  const isPreview = hasPreviewProps(props)
  const id = isPreview ? props.searchParams.p : props.params.childSlug

  let client = isPreview ? await getAuthClient() : await getClient()

  if (!client) {
    return <PleaseLogin />
  }

  const { data } = await client.query({
    query: gql`
      query GetContentNode(
        $id: ID!
        $idType: ContentNodeIdTypeEnum!
        $asPreview: Boolean!
      ) {
        contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithContentEditor {
            content
          }
          date
        }
      }
    `,
    variables: {
      id,
      idType: isPreview ? 'DATABASE_ID' : 'URI',
      asPreview: isPreview,
    },
  })

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16">
              {data?.contentNode?.title}
            </h1>
            <div
              className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto"
              dangerouslySetInnerHTML={{ __html: data?.contentNode?.content ?? '' }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
