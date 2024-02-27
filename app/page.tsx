import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { gql } from '@apollo/client'
import { getClient } from '@faustwp/experimental-app-router'
import Image from 'next/image'

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
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              Il Circo Contemporaneo in Brianza
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center mx-auto">
              Siamo bellissimi, in gambissima e facciamo riderissimo
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
              Noi Siamo Spazio Bizzarro
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
          <Image
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:w-full"
            height="500"
            src="/2020-08_spazio-bizzarro-4.jpg"
            width="1000"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              Cosa Facciamo
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
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
              Il Team Bizzarro
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
              Ecco il nostro fantastico team
            </p>
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
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              Vuoi restare informato?
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
              Iscriviti alla newsletter più bizzarra che c&apos;è! L&apos;unica newsletter
              alla quale sarai tu a scrivere perché penserai di essere stato dimenticato!
            </p>
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
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <h2>Posts</h2>
    //   <ul>
    //     {data.posts.nodes.map((post: Post) => (
    //       <li key={post.id}>
    //         <Link href={`/${post.slug}`}>{post.title}</Link>
    //       </li>
    //     ))}
    //   </ul>
    // </main>
  )
}
