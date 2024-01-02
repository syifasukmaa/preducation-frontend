import React from 'react'

const NotifButton = ({ handleShowModal }) => {
  return (
    <button
      onClick={handleShowModal}
      className="border-[1px] font-bold bg-orange-05 text-neutral-50  border-orange-05 hover:border-orange-05 py-[3px] px-3 rounded-2xl mr-3 text-base hover:scale-105 transition-all dark:bg-transparent  dark:text-orange-05"
    >
      Notifikasi
    </button>
  )
}

export default NotifButton
