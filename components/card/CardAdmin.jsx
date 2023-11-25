import React from 'react';
import CardAdminItem from './CardAdminItem';

export default function CardAdmin() {
  return (
    <div className="mt-12 mb-8 md:mb-10 md:mt-16 md:px-12 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <CardAdminItem
        bg={'bg-dark-blue-03'}
        total={450}
        text={'Active Users'}
      />
      <CardAdminItem
        bg={'bg-alert-green'}
        total={25}
        text={'Active Class'}
      />
      <CardAdminItem
        bg={'bg-dark-blue-05'}
        total={20}
        text={'Premium Class'}
      />
    </div>
  );
}
