import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { gql } from '@apollo/client'
import { getAuthClient, getClient } from '@faustwp/experimental-app-router'
import Link from 'next/link'
import { hasPreviewProps } from './hasPreviewProps'
import { PleaseLogin } from '@/components/please-login'

type Post = {
  id: string
  title: string
  uri: string
  slug: string
  excerpt: string
}

interface PageProps {
  params?: any
  searchParams?: any
}

export default async function Home(props: PageProps) {
  const isPreview = hasPreviewProps(props)

  let client = isPreview ? await getAuthClient() : await getClient()

  if (!client) {
    return <PleaseLogin />
  }

  const { data } = await client.query({
    query: gql`
      query GetHomepage {
        posts {
          nodes {
            id
            title
            uri
            slug
            excerpt
          }
        }
        nodeByUri(uri: "/") {
          __typename
          ... on ContentType {
            id
            name
          }
          ... on Page {
            id
            title
            featuredImage {
              node {
                altText
                uri
              }
            }
            homeSections {
              homeSubtitle
              sectionNews {
                subtitle
                title
              }
              sectionNewsletter {
                subtitle
                title
              }
              sectionWhat {
                subtitle
                title
              }
              sectionWho {
                subtitle
                title
              }
              sectionTeam {
                subtitle
                title
              }
            }
          }
        }
      }
    `,
  })
  const {
    homeSubtitle,
    sectionNews,
    sectionNewsletter,
    sectionWhat,
    sectionWho,
    sectionTeam,
  } = data.nodeByUri.homeSections

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              {data.nodeByUri.title}
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center mx-auto">
              {homeSubtitle}
            </p>
          </div>
          {/* <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex flex-col gap-2">
              <Input className="max-w-lg" placeholder="Enter your email" type="email" />
              <Button type="submit">Get Started</Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign up to get notified when we launch.
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div> */}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              {sectionWho.title}
            </h2>
            <p
              className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto"
              dangerouslySetInnerHTML={{ __html: sectionWho.subtitle ?? '' }}
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              {sectionWhat.title}
            </h2>
            <p
              className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto"
              dangerouslySetInnerHTML={{ __html: sectionWhat.subtitle ?? '' }}
            />
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">I Corsi</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">Le Gite</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">Il Circo Sociale</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">I Centri Estivi</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              {sectionTeam.title}
            </h2>
            <p
              className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto"
              dangerouslySetInnerHTML={{ __html: sectionTeam.subtitle ?? '' }}
            />
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">Nicola Bruni</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Il Direttore</p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">Nicola Bruni</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Il Responsabile</p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">Nicola Bruni</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                L&apos;insegnante
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-bold">Nicola Bruni</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                L&apos;addetto alle pulizie
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              {sectionNews.title}
            </h2>
            <p
              className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto"
              dangerouslySetInnerHTML={{ __html: sectionNews.subtitle ?? '' }}
            />
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {data.posts.nodes.map((post: Post) => (
              <div className="grid gap-2" key={post.id}>
                <Link href={`/${post.slug}`} className="text-xl font-bold">
                  {post.title}
                </Link>
                <p
                  className="text-sm text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              {sectionNewsletter.title}
            </h2>
            <p
              className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto"
              dangerouslySetInnerHTML={{ __html: sectionNewsletter.subtitle ?? '' }}
            />
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="grid gap-2">
              <Input placeholder="Name" type="text" />
              <Input placeholder="Email" type="email" />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
