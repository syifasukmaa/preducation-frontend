import React from 'react';
import UsersIcon from '../icons/UsersIcon';

export default function CardAdminItem({ bg, total, text }) {
  return (
    <div className={` ${bg} flex items-center py-5 pl-6 pr-6 rounded-[15px]`}>
      <UsersIcon />

      <div className="text-neutral-01">
        <p className="text-lg lg:text-xl text-extralight">{total}</p>
        <p className="font-bold text-base lg:text-lg">{text}</p>
      </div>
    </div>
  );
}
