'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import AddButton from '@/components/button/AddButton'
import SearchButton from '@/components/button/SearchButton'
import ActionButton from '@/components/button/ActionButton'
import SearchPopup from '@/components/popup/SearchPopup'
import { useUser } from '@/utils/swr'
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert'
import { deleteUser } from '@/utils/fetch'
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert'
import PaymentLoading from '@/components/loading/PaymentLoading'
import convert from '@/utils/convert'
import ModalUpdateUser from './components/ModalUpdateUser'
import ModalCreateUser from './components/ModalCreateUser'

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

  const { data: users, mutate, error, totalData } = useUser(token, null, search, limit, currentPage)

  const handleCurrentPage = (newPage) => {
    if (newPage <= 0) {
      return
    }
    if (newPage > Math.ceil(totalData / limit)) {
      return
    }
    router.push(`/admin/user?page=${newPage}`, { scroll: false })
  }

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/video/${chapterId}`, { scroll: false })
  }

  const handleSearch = (e) => {
    setName(e.target.value)
    if (totalData) {
      router.push(`/admin/user/?search=${e.target.value}&limit=${totalData}`, { scroll: false })
    }
    if (!e.target.value) {
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

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold">User</p>
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
          <table className="min-w-full bg-white rounded-lg">
            <thead className="text-sm font-semibold bg-orange-04 text-neutral-05">
              <tr className="text-left">
                <td className="w-24 px-4 py-3">Nama</td>
                <td className="w-32 px-4 py-3">Email</td>
                <td className="px-4 py-3">Tanggal Daftar</td>
                <td className="px-4 py-3">Role</td>
                <td className="px-4 py-3 pl-4 lg:pl-0 lg:pr-1">Terverifikasi</td>
                <td className="pl-4 pr-4 py-3 md:pl-10">Aksi</td>
              </tr>
            </thead>

            <tbody className="text-gray-700  text-[10px]">
              {error ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="flex items-center justify-center">
                      <span>{`Error: ${error}`}</span>
                    </div>
                  </td>
                </tr>
              ) : users?.length <= 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center min-h-[200px] md:items-start md:flex-row">
                      <Image
                        src="/img/empty_3d.jpg"
                        width={80}
                        height={80}
                        alt="empty image"
                        className="w-[80px] h-[80px] mt-2"
                        priority="true"
                      />
                      <div className="ml-4 md:text-start">
                        <p className="mt-4 text-xl font-bold text-orange-05">Data tidak ditemukan</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : users ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-4 text-xs font-bold text-gray-05 w-[15%]">{user.name}</td>
                    <td className="px-4 py-4 text-xs font-bold text-gray-05 w-[15%]">{user.email}</td>
                    <td className="px-4 py-4 text-xs font-bold text-gray-05 w-[15%]">
                      {convert.formatToDate(user.createdAt)}
                    </td>
                    <td
                      className={`px-4 py-4 text-xs font-bold text-gray-05 w-[15%] ${
                        user.status === 'On Progress' ? 'text-alert-red' : 'text-alert-green'
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-gray-05 w-[15%]">{user.isVerify ? ' ✅' : '❌'}</td>
                    <td className="grid px-4 py-4 text-xs font-bold text-gray-05 w-full xl:grid-cols-2 ">
                      <ActionButton
                        styles={'bg-light-green hover:border-light-green py-2'}
                        onClick={() => handleUpdateUser(user._id)}
                      >
                        Ubah
                      </ActionButton>
                      <ActionButton
                        styles={'bg-alert-red hover:border-alert-red py-2'}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Hapus
                      </ActionButton>
                    </td>
                  </tr>
                ))
              ) : (
                [...Array(7)].map((_, index) => <PaymentLoading key={index} testId={index} />)
              )}
            </tbody>
          </table>
        </div>
        {users?.length !== 0 && Number(limit) !== totalData ? (
          <div className="flex items-center justify-between mt-4 pl-4">
            <button
              disabled={currentPage <= 1 ? true : false}
              onClick={() => handleCurrentPage(Number(currentPage) - 1)}
              className={`${
                currentPage <= 1 ? 'bg-slate-700/80 cursor-not-allowed' : 'bg-primary-dark-blue hover:bg-orange-05'
              } text-white font-medium py-1 w-20 rounded text-sm`}
            >
              Previous
            </button>
            <button
              disabled={currentPage >= Math.ceil(totalData / limit) ? true : false}
              onClick={() => handleCurrentPage(Number(currentPage) + 1)}
              className={`${
                currentPage >= Math.ceil(totalData / limit)
                  ? 'bg-slate-700/80 cursor-not-allowed'
                  : 'bg-primary-dark-blue hover:bg-orange-05'
              } text-white font-medium py-1 w-20 rounded text-sm `}
            >
              Next
            </button>
          </div>
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
