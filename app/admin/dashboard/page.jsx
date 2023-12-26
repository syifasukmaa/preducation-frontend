'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import SearchButton from '@/components/button/SearchButton'
import FilterButton from '@/components/button/FilterButton'
import FilterPopup from '@/components/popup/FilterPopup'
import SearchPopup from '@/components/popup/SearchPopup'
import { usePayment } from '@/utils/swr'
import PaymentLoading from '@/components/loading/PaymentLoading'
import { LuRefreshCcw } from 'react-icons/lu'
import '../../globals.css'
import convert from '../../../utils/convert'

export default function Page() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [username, setUsername] = useState('')
  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
    filter: '',
  })

  const { payment: payments, isLoading, error, mutate } = usePayment(token, showElements.filter, username)

  const overLay = useRef(null)

  const filterCourses = (filterOption) => {
    setShowElements({
      ...showElements,
      filter: filterOption,
      showFilter: false,
    })
  }

  const handleOutsideClick = (e) => {
    if (!overLay.current.contains(e.target)) {
      setShowElements({ showFilter: false })
    }
  }

  const handleRefreshCourse = () => {
    setShowElements({
      ...showElements,
      filter: '',
    })
  }

  useEffect(() => {
    if (showElements.showFilter) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showElements.showFilter])

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold text-primary-dark-blue">Status Pembayaran</p>
        <div className="relative flex items-center">
          <LuRefreshCcw
            size={25}
            className={`mr-3 cursor-pointer text-orange-05 cursorPointer`}
            onClick={handleRefreshCourse}
            data-testid="refresh-button"
          />
          <FilterButton onClick={() => setShowElements({ ...showElements, showFilter: true })} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={username}
              setTitle={setUsername}
            />
          )}
        </div>

        {showElements.showFilter && (
          <div className="absolute right-0 z-30 top-12" ref={overLay}>
            <FilterPopup clickClose={() => setShowElements({ ...showElements, showFilter: false })}>
              <div data-testid="paid-button" className="item-filter" onClick={() => filterCourses('Paid')}>
                SUDAH BAYAR
              </div>

              <div data-testid="onprogress-button" className="item-filter" onClick={() => filterCourses('On Progress')}>
                BELUM BAYAR
              </div>
            </FilterPopup>
          </div>
        )}
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
              </tr>
            </thead>

            {error ? (
              <tbody>
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="flex items-center justify-center">
                      <span>{`Error: ${error}`}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : payments ? (
              payments.map((payment) => (
                <tbody key={payment._id} className="text-gray-700 whitespace-nowrap text-[10px]">
                  <tr>
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
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <PaymentLoading key={index} testId={index} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}
