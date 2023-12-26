'use client'
import React from 'react'
import Form from './Form'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()
  const name = session?.user?.name
  return (
    <nav className=" bg-neutral-01 py-5 md:px-12 px-4 flex justify-between items-center text-dark-blue-05 shadow-md">
      <div className="text-primary-dark-blue xl:text-2xl md:text-xl font-bold text-center">Hi, {name}!</div>
      <Form />
    </nav>
  )
}
