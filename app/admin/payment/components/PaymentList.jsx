import { formatToCurrency, formatToDate } from '@/utils/convert'
import React from 'react'

const PaymentList = ({ payment }) => {
  return (
    <tr key={payment._id}>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[15%]">
        {payment.userId && payment.userId.username ? payment.userId.username : ''}
      </td>
      <td className="py-3 pl-4 pr-3 text-xs font-bold dark:text-dark-grey-02 text-gray-05 w-[17%]">
        {payment.courseId.category.name}
      </td>
      <td className="px-4 py-3 text-xs font-bold text-gray-04 dark:text-dark-grey-02 w-[15%]">
        {payment.courseId.level}
      </td>
      <td
        className={`py-3 px-4 text-xs font-bold w-[15%] ${
          payment.status === 'On Progress' ? 'text-alert-red' : 'text-alert-green'
        }`}
      >
        {payment.status === 'On Progress' ? 'BELUM BAYAR' : 'SUDAH BAYAR'}
      </td>
      <td className="px-4 py-3 text-xs font-bold lg:pl-4 lg:pr-0 text-gray-04 w-[20%] dark:text-dark-grey-02">
        {payment.paymentType}
      </td>
      <td className="px-4 py-3 pl-4 text-xs font-bold lg:pl-0 lg:pr-1 text-gray-05 dark:text-dark-grey-02">
        {formatToDate(payment.createdAt)}
      </td>
      <td className={`py-3 pl-4 pr-4 text-xs font-bold w-[15%] md:pl-10 dark:text-dark-grey-02`}>
        {formatToCurrency(payment.courseId.price)}
      </td>
    </tr>
  )
}

export default PaymentList
