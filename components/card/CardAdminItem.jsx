import React from 'react';
import UsersIcon from '../icons/UsersIcon';

export default function CardAdminItem({ bg, total, text, icon }) {
  return (
    <div className={` ${bg} flex items-center py-5 pl-6 pr-6 rounded-[15px]`}>
      <div className="bg-neutral-01 dark:text-dark-grey-02 dark:bg-slate-200 p-2 rounded-[10px] mr-4">{icon}</div>

      <div className="text-neutral-01">
        <p className="text-lg lg:text-xl text-extralight dark:text-dark-yellow">{total}</p>
        <p className="text-base font-bold lg:text-lg dark:text-dark-yellow">{text}</p>
      </div>
    </div>
  );
}
