'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import SearchButton from '@/components/button/SearchButton'
import FilterButton from '@/components/button/FilterButton'
import SearchPopup from '@/components/popup/SearchPopup'
import { usePayment } from '@/utils/swr'
import PaymentLoading from '@/components/loading/PaymentLoading'
import { LuRefreshCcw } from 'react-icons/lu'
import { useRouter, useSearchParams } from 'next/navigation'
import ErrorData from '@/components/ErrorData'
import DataNotFound from '@/components/DataNotFound'
import PaginationButton from '@/components/button/PaginationButton'
import FilterPayment from './components/FilterPayment'
import PaymentList from './components/PaymentList'

export default function Page() {
  const [username, setUsername] = useState('')
  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
    filter: '',
  })
  const { data: session } = useSession()
  const token = session?.user?.accessToken
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = searchParams.get('page') || 1
  const search = searchParams.get('search') || ''
  const filter = searchParams.get('filter') || ''
  const limit = searchParams.get('limit') || 7
  const { data: payments, totalData, error } = usePayment(token, filter, search, limit, currentPage)

  const handleCurrentPage = (newPage) => {
    if (newPage <= 0) {
      return
    }
    if (newPage > Math.ceil(totalData / limit)) {
      return
    }
    router.push(`/admin/payment?page=${newPage}`, { scroll: false })
  }

  const handleSearch = (e) => {
    setUsername(e.target.value)
    if (totalData) {
      router.push(`/admin/payment/?search=${e.target.value}&filter=${filter}&limit=${totalData}`, { scroll: false })
    }
    if (!e.target.value) {
      router.push(`/admin/payment/?filter=${filter}`, { scroll: false })
      setUsername('')
    }
  }

  const filterCourses = (filterOption) => {
    setShowElements({
      ...showElements,
      filter: filterOption,
      showFilter: false,
    })
    if (totalData) {
      router.push(`/admin/payment/?search=${search}&filter=${filterOption}&limit=${totalData}`, { scroll: false })
    }
  }

  const handleCloseFilter = () => {
    setShowElements({ ...showElements, showFilter: false })
    setUsername('')
    router.push(`/admin/payment`, { scroll: false })
  }

  const handleRefreshCourse = () => {
    setShowElements({
      ...showElements,
      filter: '',
    })
    router.push(`/admin/payment`, { scroll: false })
    setUsername('')
  }

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold text-primary-dark-blue dark:text-dark-grey-02">Status Pembayaran</p>
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
              onClick={() => {
                setShowElements({ ...showElements, showInput: false })
              }}
              handleChange={handleSearch}
              title={username}
            />
          )}
        </div>

        {showElements.showFilter && (
          <FilterPayment
            filterCourses={filterCourses}
            handleCloseFilter={handleCloseFilter}
            setShowElements={setShowElements}
            showElements={showElements}
          />
        )}
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
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
              ) : payments?.length <= 0 ? (
                <DataNotFound />
              ) : payments ? (
                payments.map((payment) => <PaymentList payment={payment} key={payment._id} />)
              ) : (
                [...Array(7)].map((_, index) => <PaymentLoading key={index} testId={index} />)
              )}
            </tbody>
          </table>
        </div>
        {payments?.length !== 0 && Number(limit) !== totalData && !filter ? (
          <PaginationButton
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            limit={limit}
            totalData={totalData}
          />
        ) : null}
      </div>
    </div>
  )
}
