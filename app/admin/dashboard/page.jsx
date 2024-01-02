'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePayment, useCategory } from '@/utils/swr'
import PaymentLoading from '@/components/loading/PaymentLoading'
import Chart from './components/Chart'
import PaymentList from '../payment/components/PaymentList'
import ErrorData from '@/components/ErrorData'

export default function Page() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const { data: payments, error } = usePayment(token, null, null, 5)
  const { data: categories } = useCategory(token, true)

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
                <td className="px-4 py-3 lg:pl-4">Metode Pembayaran</td>
                <td className="px-4 py-3 lg:pl-0">Tanggal Bayar</td>
                <td className="py-3 pl-4 pr-4 md:pl-8">Total</td>
              </tr>
            </thead>
            <tbody className="text-gray-700 whitespace-nowrap text-[10px] ">
              {error ? (
                <ErrorData error={error} />
              ) : payments ? (
                payments.map((payment) => <PaymentList payment={payment} key={payment._id} />)
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
