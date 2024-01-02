'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import AddButton from '@/components/button/AddButton'
import SearchButton from '@/components/button/SearchButton'
import SearchPopup from '@/components/popup/SearchPopup'
import ChapterLoading from '@/components/loading/ChapterLoading'
import { useCourse } from '@/utils/swr'
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert'
import { deleteChapter } from '@/utils/fetch'
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert'
import ModalChapter from './components/ModalChapter'
import ErrorData from '@/components/ErrorData'
import ChapterList from './components/ChapterList'

export default function Page() {
  const params = useParams()
  const idCourse = params.id

  const [showElements, setShowElements] = useState({
    showInput: false,
  })
  const [title, setTitle] = useState('')
  const [Id, setId] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const { data: course, isLoading, mutate, error } = useCourse(token, idCourse, null, null)

  const router = useRouter()

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/video/${chapterId}`)
  }

  const handleSearch = (e) => {
    setTitle(e.target.value)
  }

  const handleEditChapter = (id) => {
    setEditMode(true)
    setShowModal(true)
    setId(id)
  }

  const handleAddChapter = (id) => {
    setEditMode(false)
    setShowModal(true)
    setId(id)
  }

  const handleDeleteChapter = async (id) => {
    const isConfirmed = await ConfirmDeleteAlert('Delete Chapter')
    if (isConfirmed) {
      const response = await deleteChapter(token, id)
      if (response.ok) {
        DeleteSuccessAlert('Chapter')
        mutate()
      }
    }
  }
  const searchChapter = (chapter) => {
    const titleLower = title.toLowerCase()
    const isTitleMatch = chapter.title?.toLowerCase().includes(titleLower)
    return isTitleMatch
  }

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showModal])

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold dark:text-dark-grey-02">Kelola Chapter</p>
        <div className="relative flex items-center">
          <AddButton onClick={() => handleAddChapter(idCourse)} />
          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />
          {showElements.showInput ? (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={title}
              handleChange={handleSearch}
            />
          ) : null}
        </div>
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg dark:bg-dark-backgroud">
            <thead className="text-sm font-semibold bg-orange-04 dark:bg-dark-grey-04 dark:text-dark-grey-05 text-neutral-05">
              <tr className="text-left">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3 w-72">Nama Chapter</th>
                <th className="px-4 py-3">Total Durasi</th>
                <th className="px-4 py-3">Link Video</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-gray-700  text-[10px]">
              {isLoading ? (
                <>
                  {[...Array(8)].map((_, index) => (
                    <ChapterLoading key={index} />
                  ))}
                </>
              ) : error ? (
                <ErrorData error={error} />
              ) : course && course.chapters && course.chapters.length <= 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center md:items-start md:flex-row">
                      <Image
                        src="/img/empty_3d.jpg"
                        width={80}
                        height={80}
                        alt="empty image"
                        className="w-[80px] h-[80px] mt-2"
                        priority="true"
                      />
                      <div className="ml-4 md:text-start">
                        <p className="mt-4 text-xl font-bold text-orange-05">Chapter masih kosong</p>
                        <p className="mt-1 text-base dark:text-dark-grey-02">
                          Cobalah untuk{' '}
                          <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => handleAddChapter(idCourse)}
                          >
                            menambahkan chapter
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : course && course.chapters ? (
                course.chapters
                  .filter((chapter) => searchChapter(chapter))
                  .map((chapter, index) => (
                    <ChapterList
                      key={chapter._id}
                      index={index}
                      chapter={chapter}
                      goToChapter={goToChapter}
                      handleDeleteChapter={handleDeleteChapter}
                      handleEditChapter={handleEditChapter}
                    />
                  ))
              ) : (
                [...Array(8)].map((_, index) => <ChapterLoading key={index} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal ? (
        <ModalChapter
          onClose={() => setShowModal(false)}
          editMode={editMode}
          token={token}
          Id={Id}
          mutate={mutate}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  )
}
