'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useState } from 'react'
import { Fb } from './icons/fb'
import { Ig } from './icons/ig'
import { cn } from '@/lib/utils'

type MenuItems = {
  nodes: {
    id: string
    label: string
    uri: string
    parentId: string | null
    children?: MenuItems['nodes']
  }[]
}

type HierarchicalLink = MenuItems['nodes'][number] & {
  children: HierarchicalLink[]
}

const ChevronDown = () => (
  <svg
    className="w-2.5 h-2.5 ms-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m1 1 4 4 4-4"
    />
  </svg>
)
const SubMenu = ({
  menuItems,
  className,
}: {
  menuItems: HierarchicalLink[]
  className: string
}) => {
  return (
    <div className={className}>
      <ul className="p-4 grid grid-cols-2 gap-4">
        {menuItems.map(node => (
          <li key={node.id}>
            <Link
              href={node.uri}
              className="text-primary text-sm font-medium hover:text-destructive transition duration-200"
            >
              {node.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const flatListToHierarchical = (data: MenuItems['nodes']): HierarchicalLink[] => {
  const tree: any = []
  const childrenOf: any = {}
  data.forEach(item => {
    const newItem = { ...item }
    const { id, parentId } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem.children = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}

const LinkWithHierarchy = ({ uri, label, children }: HierarchicalLink) => {
  const [open, setOpen] = useState(false)

  return (
    <li
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      className="relative"
    >
      <Link
        href={uri}
        className="text-primary text-sm font-medium hover:text-destructive transition duration-200 flex justify-between items-center"
      >
        {label}
        {children.length > 0 && <ChevronDown />}
      </Link>
      {children.length > 0 && (
        <SubMenu
          menuItems={children}
          className={cn(
            'absolute z-10 w-[400px] -left-[50%] bg-white border border-input rounded-md shadow-lg',
            open ? 'block' : 'hidden',
          )}
        />
      )}
    </li>
  )
}

export const Header = ({ menuItems }: { menuItems: MenuItems }) => {
  const [mobileNavOpen, setOpen] = useState(false)
  const hierarchicalyLinks = flatListToHierarchical(menuItems.nodes)
  return (
    <div className="sticky top-0 z-50 lg:-top-16">
      <nav className="bg-muted shadow-lg">
        <div className="container flex justify-center relative h-16">
          <Link href="/" className="m-2 lg:mt-8 flex items-center">
            <Logo />
          </Link>
          <button
            onClick={() => setOpen(state => !state)}
            className="absolute right-0 top-0 m-2 lg:hidden"
          >
            <svg
              className="text-white"
              width="48"
              height="48"
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
              {hierarchicalyLinks.map(node => (
                <LinkWithHierarchy key={node.id} {...node} />
              ))}
            </ul>
            <div className="hidden lg:flex">
              <a
                href="https://www.facebook.com/spaziobizzarro"
                className="rounded-full bg-primary p-1.5 m-2 flex items-center justify-between hover:bg-destructive focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <Fb className="text-white h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/spaziobizzarro/"
                className="rounded-full bg-primary p-1.5 m-2 flex items-center justify-between hover:bg-destructive focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <Ig className="text-white h-5 w-5" />
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
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(state => !state)}
                  className="text-sm font-medium hover:text-opacity-80 transition duration-200"
                >
                  Home
                </Link>
              </li>
              {menuItems.nodes.map(node => (
                <li key={node.id} className={node.parentId ? 'pl-4' : ''}>
                  <Link
                    href={node.uri}
                    onClick={() => setOpen(state => !state)}
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
