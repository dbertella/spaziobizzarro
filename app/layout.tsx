import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";
import Link from "next/link";
import "@/faust.config.js";
import { FaustProvider } from "@faustwp/experimental-app-router/ssr";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { Header } from "@/components/Header";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetLayout {
        generalSettings {
          title
          description
        }
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            label
            uri
          }
        }
        footerMenuItems: menuItems(where: { location: FOOTER }) {
          nodes {
            id
            label
            uri
          }
        }
      }
    `,
  });

  console.log(data);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <FaustProvider>
          <header>
            <Logo />
            <div>
              <h1>
                <Link href="/">{data.generalSettings.title}</Link>
              </h1>

              <h5>{data.generalSettings.description}</h5>
            </div>
            <Header menuItems={data.primaryMenuItems} />
          </header>
          {children}
        </FaustProvider>
      </body>
    </html>
  );
}
