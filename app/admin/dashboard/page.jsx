'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePayment, useCategory } from '@/utils/swr'
import PaymentLoading from '@/components/loading/PaymentLoading'
import convert from '@/utils/convert'
import Chart from './components/Chart'


export default function Page() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const { payment: payments, isLoading, error, mutate } = usePayment(token, null, null, 5);
  const { categories } = useCategory(token, true);

  return (
    <div className={`md:px-12 mb-20 px-4`}>
      <div className="relative flex items-center justify-between mt-5 md:py-2">
        <p className="text-xl font-bold text-primary-dark-blue dark:text-dark-grey-02">
          Rekap Pertumbuhan User dan Pendapatan satu bulan terakhir
        </p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row items-center md:gap-20 mt-3 md:h-[400px] relative">
        <p className="hidden md:block absolute transform text-sm text-[#413ea0] -rotate-90 scale-x-(-1) origin-bottom-left -translate-y-1/2">
          Total user
        </p>
        <p className="hidden md:block absolute transform text-sm text-orange-05 -rotate-90 scale-x-(-1) origin-bottom-left  inset-1/2 -translate-x-6 -translate-y-1/2">
          Pendapatan
        </p>
        <Chart type={'user'} data={categories?.chartUser} />
        <Chart type={'payment'} data={categories?.chartTransaction} />
      </div>

      <div className="relative flex items-center justify-between mt-5 md:pt-2">
        <p className="text-xl font-bold text-primary-dark-blue dark:text-dark-grey-02">Transaksi Terbaru</p>
      </div>
      <div className="mt-4 overflow-x-auto mb- md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg dark:bg-dark-backgroud">
            <thead className="text-sm font-semibold bg-orange-04 dark:bg-dark-grey-04 dark:text-dark-grey-05 text-neutral-05">
              <tr>
                <td className="w-24 px-4 py-3">ID</td>
                <td className="w-32 px-4 py-3">Kategori</td>
                <td className="px-4 py-3">Kelas Premium</td>
                <td className="px-4 py-3">Status</td>
                <td className="px-4 py-3 lg:pl-4 lg:pr-0">Metode Pembayaran</td>
                <td className="px-4 py-3 pl-4 lg:pl-0 lg:pr-1">Tanggal Bayar</td>
                <td className="py-3 pl-4 pr-4 md:pl-10">Total</td>
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
                    <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[15%]">
                      {payment.userId && payment.userId.username ? payment.userId.username : ''}
                    </td>
                    <td className="py-3 pl-4 pr-3 text-xs font-bold text-gray-05 dark:text-dark-grey-02 w-[17%]">
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
                    <td className="px-4 py-3 text-xs font-bold lg:pl-4 lg:pr-0 dark:text-dark-grey-02 text-gray-04 w-[20%]">
                      {payment.paymentType}
                    </td>
                    <td className="px-4 py-3 pl-4 text-xs font-bold lg:pl-0 lg:pr-1 text-gray-05 dark:text-dark-grey-02">
                      {convert.formatToDate(payment.createdAt)}
                    </td>
                    <td className={`py-3 pl-4 pr-4 text-xs font-bold w-[15%] md:pl-10 dark:text-dark-grey-02`}>
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
