import React from 'react';
import UsersIcon from '../icons/UsersIcon';

export default function CardAdminItem({ bg, total, text, icon }) {
  return (
    <div className={` ${bg} flex items-center py-5 pl-6 pr-6 rounded-[15px]`}>
      <div className="bg-neutral-01 p-2 rounded-[10px] mr-4">{icon}</div>

      <div className="text-neutral-01">
        <p className="text-lg lg:text-xl text-extralight">{total}</p>
        <p className="font-bold text-base lg:text-lg">{text}</p>
      </div>
    </div>
  );
}
