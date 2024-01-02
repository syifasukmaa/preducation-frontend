import ActionButton from '@/components/button/ActionButton'
import { formatToDate } from '@/utils/convert'
import React from 'react'

const UserList = ({ user, handleUpdateUser, handleDeleteUser }) => {
  return (
    <tr key={user._id}>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[15%]">{user.name}</td>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[15%]">{user.email}</td>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[15%]">
        {formatToDate(user.createdAt)}
      </td>
      <td
        className={`pl-8 pr-4 py-4 text-xs font-bold w-[15%] ${
          user.role === 'user' ? 'text-gray-05 dark:text-dark-grey-02' : 'text-orange-05'
        }`}
      >
        {user.role}
      </td>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[10%]">
        {user.isVerify ? ' ✅' : '❌'}
      </td>
      <td className="grid w-[85%] px-4 md:ml-6 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 xl:grid-cols-2">
        <ActionButton
          styles={'bg-light-green hover:border-light-green py-2'}
          onClick={() => handleUpdateUser(user._id)}
        >
          Ubah
        </ActionButton>
        <ActionButton styles={'bg-alert-red hover:border-alert-red py-2'} onClick={() => handleDeleteUser(user._id)}>
          Hapus
        </ActionButton>
      </td>
    </tr>
  )
}

export default UserList
