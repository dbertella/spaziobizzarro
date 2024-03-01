'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useState } from 'react'
import { Fb } from './icons/fb'
import { Ig } from './icons/ig'

type MenuItems = {
  nodes: {
    id: string
    label: string
    uri: string
  }[]
}

export const Header = ({ menuItems }: { menuItems: MenuItems }) => {
  const [mobileNavOpen, setOpen] = useState(false)
  return (
    <div>
      <nav className="bg-muted relative shadow-lg">
        <div className="container flex justify-center -my-12 relative">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
          <button
            onClick={() => setOpen(state => !state)}
            className="absolute right-0 top-12 m-1 lg:hidden"
          >
            <svg
              className="text-white"
              width="51"
              height="51"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="currentColor"></rect>
              <path
                d="M37 32H19M37 24H19"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <ul className="hidden lg:flex items-center gap-10">
              {menuItems.nodes.map(node => (
                <li key={node.id}>
                  <Link
                    href={node.uri}
                    className="text-primary text-sm font-medium hover:text-opacity-80 transition duration-200"
                  >
                    {node.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex gap-6">
              <a
                href="https://www.facebook.com/spaziobizzarro"
                className="rounded-full bg-primary p-2 m-2 flex items-center justify-between hover:bg-destructive focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <Fb className="text-white h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/spaziobizzarro/"
                className="rounded-full bg-primary p-2 m-2 flex items-center justify-between hover:bg-destructive focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <Ig className="text-white h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      {mobileNavOpen && (
        <div className="navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-xs z-50">
          <div
            onClick={() => setOpen(state => !state)}
            className="navbar-menu fixed inset-0 bg-primary opacity-20"
          />
          <nav className="relative p-8 w-full h-full bg-white overflow-y-auto">
            <div className="flex items-center justify-between">
              <a href="#" className="inline-block">
                <img className="h-18" src="shopky-assets/logos/shopky-logo.svg" alt="" />
              </a>
              <button onClick={() => setOpen(state => !state)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-12 py-12">
              {menuItems.nodes.map(node => (
                <li key={node.id}>
                  <Link
                    href={node.uri}
                    className="text-sm font-medium hover:text-opacity-80 transition duration-200"
                  >
                    {node.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/spaziobizzarro/"
                className="rounded-full bg-white flex items-center justify-between h-8 w-8 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <Fb />
              </a>
              <a
                href="https://www.instagram.com/spaziobizzarro/"
                className="rounded-full bg-white flex items-center justify-between h-8 w-8 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <Ig />
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
