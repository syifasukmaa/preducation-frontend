'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import AddButton from '@/components/button/AddButton'
import SearchButton from '@/components/button/SearchButton'
import SearchPopup from '@/components/popup/SearchPopup'
import { useUser } from '@/utils/swr'
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert'
import { deleteUser } from '@/utils/fetch'
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert'
import UserLoading from '@/components/loading/UserLoading'
import ModalUpdateUser from './components/ModalUpdateUser'
import ModalCreateUser from './components/ModalCreateUser'
import ErrorData from '@/components/ErrorData'
import PaginationButton from '@/components/button/PaginationButton'
import DataNotFound from '@/components/DataNotFound'
import UserList from './components/UserList'

export default function Page() {
  const [name, setName] = useState('')
  const [showElements, setShowElements] = useState({
    showInput: false,
  })
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [updateId, setUpdateId] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = searchParams.get('page') || 1
  const search = searchParams.get('search') || ''
  const limit = searchParams.get('limit') || 7

  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const { data: users, mutate, isLoading, error, totalData } = useUser(token, null, search, limit, currentPage)

  const handleCurrentPage = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalData / limit)) {
      router.push(`/admin/user?page=${newPage}`, { scroll: false })
    }
  }

  const handleSearch = (e) => {
    const inputValue = e.target.value
    setName(inputValue)
    if (totalData) {
      router.push(`/admin/user/?search=${inputValue}&limit=${totalData}`, { scroll: false })
    }
    if (!inputValue) {
      router.push(`/admin/user`, { scroll: false })
      setName('')
    }
  }

  const handleAddUser = () => {
    setShowModalAdd(true)
  }

  const handleUpdateUser = (id) => {
    setShowModalUpdate(true)
    setUpdateId(id)
  }

  const handleDeleteUser = async (id) => {
    const isConfirmed = await ConfirmDeleteAlert('Hapus User')
    if (isConfirmed) {
      const response = await deleteUser(token, id)
      if (response.ok) {
        mutate()
        DeleteSuccessAlert('User')
      }
    }
  }

  useEffect(() => {
    if (showModalAdd) {
      document.body.classList.add('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showModalAdd])

  useEffect(() => {
    if (showModalAdd || showModalUpdate) {
      document.body.classList.add('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showModalAdd, showModalUpdate])

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold dark:text-dark-grey-02">User</p>
        <div className="relative flex items-center">
          <AddButton onClick={handleAddUser} />
          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />
          {showElements.showInput && (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={name}
              handleChange={handleSearch}
            />
          )}
        </div>
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg dark:bg-dark-backgroud">
            <thead className="text-sm font-semibold bg-orange-04 dark:bg-dark-grey-04 dark:text-dark-grey-05 text-neutral-05">
              <tr className="text-left">
                <td className="w-24 px-4 py-3">Nama</td>
                <td className="w-32 px-4 py-3">Email</td>
                <td className="px-4 py-3">Tanggal Daftar</td>
                <td className="py-3 pl-8 pr-4">Role</td>
                <td className="px-4 py-3 lg:pl-0 xl:pr-1">Terverifikasi</td>
                <td className="py-3 pl-4 pr-4 md:pl-10">Aksi</td>
              </tr>
            </thead>

            <tbody className="text-gray-700  text-[10px]">
              {isLoading ? (
                [...Array(7)].map((_, index) => (
                  <>
                    <UserLoading key={index} testId={index} />
                  </>
                ))
              ) : error ? (
                <ErrorData error={error} />
              ) : users?.length <= 0 ? (
                <DataNotFound />
              ) : users ? (
                users.map((user) => (
                  <UserList
                    key={user._id}
                    handleDeleteUser={handleDeleteUser}
                    handleUpdateUser={handleUpdateUser}
                    user={user}
                  />
                ))
              ) : null}
            </tbody>
          </table>
        </div>
        {users?.length !== 0 && Number(limit) !== totalData ? (
          <PaginationButton
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            limit={limit}
            totalData={totalData}
          />
        ) : null}
      </div>

      {showModalUpdate && (
        <ModalUpdateUser
          onClose={() => setShowModalUpdate(false)}
          token={token}
          mutate={mutate}
          userId={updateId}
          setShowModal={setShowModalUpdate}
        />
      )}
      {showModalAdd && (
        <ModalCreateUser
          onClose={() => setShowModalAdd(false)}
          token={token}
          mutate={mutate}
          setShowModal={setShowModalAdd}
        />
      )}
    </div>
  )
}
