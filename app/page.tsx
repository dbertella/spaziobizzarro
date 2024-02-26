import { gql } from '@apollo/client'
import { getClient } from '@faustwp/experimental-app-router'
import Image from 'next/image'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  uri: string
  slug: string
}

export default async function Home() {
  let client = await getClient()

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            uri
            slug
          }
        }
      }
    `,
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Posts</h2>
      <ul>
        {data.posts.nodes.map((post: Post) => (
          <li key={post.id}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
