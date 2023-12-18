'use client'
import React from 'react'
import CardAdminItem from './CardAdminItem'
import ClassIcon from '../icons/ClassIcon'
import UsersIcon from '../icons/UsersIcon'
import PremiumIcon from '../icons/PremiumIcon'
import { useCategory } from '@/utils/swr'
import { useSession } from 'next-auth/react'

export default function CardAdmin() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken
  const { categories, isLoading, error } = useCategory(token, true)

  if (isLoading) return <p>loading</p>
  if (error) return <p>error</p>

  return (
    <div className="mt-12 mb-8 md:mb-10 md:mt-16 md:px-12 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <CardAdminItem bg={'bg-alert-green'} icon={<UsersIcon />} total={categories?.activeUsers} text={'Active Users'} />
      <CardAdminItem
        bg={'bg-secondary-dark-blue'}
        icon={<ClassIcon />}
        total={categories?.activeClass}
        text={'Active Class'}
      />
      <CardAdminItem
        bg={'bg-light-green'}
        icon={<PremiumIcon />}
        total={categories?.premiumClass}
        text={'Premium Class'}
      />
    </div>
  )
}
