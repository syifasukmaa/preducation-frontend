import React from 'react';
import CardAdminItem from './CardAdminItem';
import ClassIcon from '../icons/ClassIcon';
import UsersIcon from '../icons/UsersIcon';
import PremiumIcon from '../icons/PremiumIcon';

export default function CardAdmin() {
  return (
    <div className="mt-12 mb-8 md:mb-10 md:mt-16 md:px-12 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <CardAdminItem
        bg={'bg-alert-green'}
        icon={<UsersIcon />}
        total={450}
        text={'Active Users'}
      />
      <CardAdminItem
        bg={'bg-secondary-dark-blue'}
        icon={<ClassIcon />}
        total={25}
        text={'Active Class'}
      />
      <CardAdminItem
        bg={'bg-light-green'}
        icon={<PremiumIcon />}
        total={20}
        text={'Premium Class'}
      />
    </div>
  );
}
