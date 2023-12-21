'use client';
import React from 'react';
import CardAdminItem from './CardAdminItem';
import ClassIcon from '../icons/ClassIcon';
import UsersIcon from '../icons/UsersIcon';
import PremiumIcon from '../icons/PremiumIcon';
import { useCategory } from '@/utils/swr';
import { useSession } from 'next-auth/react';
import { usePathname, useParams } from 'next/navigation';

export default function CardAdmin() {
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const pathName = usePathname();

  const urlShould = pathName === `/admin/course/${id}`;
  const { categories, isLoading, error } = useCategory(token, true);

  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <div
      className={`grid gap-4 px-4 mt-8 mb-8 md:mb-10 md:mt-8 md:px-12 md:grid-cols-2 lg:grid-cols-3 md:gap-5 ${
        urlShould ? 'hidden' : ''
      }`}
    >
      <CardAdminItem
        bg={'bg-alert-green'}
        icon={<UsersIcon />}
        total={categories?.activeUsers}
        text={'Active Users'}
      />
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
  );
}
