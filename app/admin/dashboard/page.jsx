'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePayment } from '@/utils/swr'
import PaymentLoading from '@/components/loading/PaymentLoading'
import convert from '@/utils/convert'

export default function Page() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const { payment: payments, isLoading, error, mutate } = usePayment(token, null, null, 5)

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold text-primary-dark-blue">Transaksi Terbaru</p>
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="text-sm font-semibold bg-orange-04 text-neutral-05">
              <tr>
                <td className="w-24 px-4 py-3">ID</td>
                <td className="w-32 px-4 py-3">Kategori</td>
                <td className="px-4 py-3">Kelas Premium</td>
                <td className="px-4 py-3">Status</td>
                <td className="px-4 py-3 lg:pl-4 lg:pr-0">Metode Pembayaran</td>
                <td className="px-4 py-3 pl-4 lg:pl-0 lg:pr-1">Tanggal Bayar</td>
                <td className="pl-4 pr-4 py-3 md:pl-10">Total</td>
              </tr>
            </thead>
            <tbody className="text-gray-700 whitespace-nowrap text-[10px] ">
              {error ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="flex items-center justify-center">
                      <span>{`Error: ${error}`}</span>
                    </div>
                  </td>
                </tr>
              ) : payments ? (
                payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-4 py-4 text-xs font-bold text-gray-05 w-[15%]">
                      {payment.userId && payment.userId.username ? payment.userId.username : ''}
                    </td>
                    <td className="py-3 pl-4 pr-3 text-xs font-bold text-gray-05 w-[17%]">
                      {payment.courseId.category.name}
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-04 w-[15%]">{payment.courseId.level}</td>
                    <td
                      className={`py-3 px-4 text-xs font-bold w-[15%] ${
                        payment.status === 'On Progress' ? 'text-alert-red' : 'text-alert-green'
                      }`}
                    >
                      {payment.status === 'On Progress' ? 'BELUM BAYAR' : 'SUDAH BAYAR'}
                    </td>
                    <td className="px-4 py-3 text-xs font-bold lg:pl-4 lg:pr-0 text-gray-04 w-[20%]">
                      {payment.paymentType}
                    </td>
                    <td className="px-4 py-3 pl-4 text-xs font-bold lg:pl-0 lg:pr-1 text-gray-05">
                      {convert.formatToDate(payment.createdAt)}
                    </td>
                    <td className={`py-3 pl-4 pr-4 text-xs font-bold w-[15%] md:pl-10`}>
                      {convert.formatToCurrency(payment.courseId.price)}
                    </td>
                  </tr>
                ))
              ) : (
                [...Array(5)].map((_, index) => <PaymentLoading key={index} testId={index} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
