'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchButton from '@/components/button/SearchButton'
import FilterButton from '@/components/button/FilterButton'
import SearchPopup from '@/components/popup/SearchPopup'
import AddButton from '@/components/button/AddButton'
import CourseLoading from '@/components/loading/CourseLoading'
import { useCourse } from '@/utils/swr'
import { useSession } from 'next-auth/react'
import ModalCreateCourse from './components/ModalCreateCourse'
import CourseBody from './components/CourseBody'
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert'
import { deleteCourse } from '@/utils/fetch'
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert'
import FilterCourse from './components/FilterCourse'
import PaginationButton from '@/components/button/PaginationButton'
import DataNotFound from '@/components/DataNotFound'
import ErrorData from '@/components/ErrorData'

export default function Page() {
  const [title, setTitle] = useState('')
  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
  })
  const [showModal, setShowModal] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState({
    'Data Science': false,
    'Web Development': false,
    'Android Development': false,
    'UI/UX Design': false,
    'Data Science': false,
    'IOS Development': false,
    'Product Management': false,
  })
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = searchParams.get('page') || 1
  const search = searchParams.get('search') || ''
  const limit = searchParams.get('limit') || 7
  const filter = searchParams.get('filter') || ''
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const selectedCategoryKeys = Object.entries(selectedCategories)
    .filter(([key, value]) => value === true)
    .map(([key]) => key)

  const {
    data: courses,
    totalData,
    isLoading,
    mutate,
    error,
  } = useCourse(null, null, selectedCategoryKeys, title, limit, currentPage)

  const handleCurrentPage = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalData / limit)) {
      router.push(`/admin/course?page=${newPage}`, { scroll: false })
    }
  }
  const handleSearch = (e) => {
    const inputValue = e.target.value
    setTitle(inputValue)
    if (totalData) {
      router.push(`/admin/course/?search=${inputValue}&filter=${filter}&limit=${totalData}`, { scroll: false })
    }
    if (!inputValue) {
      router.push(`/admin/course/?filter=${filter}`, { scroll: false })
      setTitle('')
    }
  }

  const goToCourseDetail = (chapterId) => {
    router.push(`/admin/course/${chapterId}`)
  }

  const handleDeleteCourse = async (courseId) => {
    const isConfirmed = await ConfirmDeleteAlert('Delete Course')
    if (isConfirmed) {
      const response = await deleteCourse(token, courseId)
      if (response.ok) {
        mutate()
        DeleteSuccessAlert('Course')
      }
    }
  }

  const handleAddCourse = () => {
    setShowModal(true)
  }

  const handleCheckboxChange = (label) => {
    setSelectedCategories({
      ...selectedCategories,
      [label]: !selectedCategories[label],
    })
    if (totalData) {
      router.push(`/admin/course/?search=${search}&limit=${totalData}`, {
        scroll: false,
      })
    }
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
        <p className="text-xl font-bold dark:text-dark-grey-02">Kelola Kelas</p>
        <div className="relative flex items-center">
          <AddButton onClick={handleAddCourse} />
          <FilterButton onClick={() => setShowElements({ ...showElements, showFilter: true })} />
          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />
          {showElements.showInput ? (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={title}
              handleChange={handleSearch}
            />
          ) : null}
        </div>

        {showElements.showFilter ? (
          <FilterCourse
            handleCheckboxChange={handleCheckboxChange}
            selectedCategories={selectedCategories}
            setShowElements={setShowElements}
            showElements={showElements}
          />
        ) : null}
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg dark:text-dark-grey-02 dark:bg-dark-backgroud">
            <thead className="text-sm font-semibold bg-orange-04 dark:bg-dark-grey-04 dark:text-dark-grey-05 text-neutral-05">
              <tr>
                <th className="px-4 py-3 text-left w-[11%]">Kode Kelas</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Nama Kelas</th>
                <th className="px-4 py-3 text-left">Tipe Kelas</th>
                <th className="px-4 py-3 text-left">Level</th>
                <th className="px-4 py-3 text-left">Harga Kelas</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-[10px]">
              {isLoading ? (
                <>
                  {[...Array(8)].map((_, index) => (
                    <CourseLoading key={index} />
                  ))}
                </>
              ) : error ? (
                <ErrorData error={error} />
              ) : courses?.length <= 0 ? (
                <DataNotFound />
              ) : courses ? (
                courses.map((course, index) => (
                  <CourseBody
                    key={course._id}
                    course={course}
                    index={index}
                    goToCourseDetail={goToCourseDetail}
                    handleDeleteCourse={handleDeleteCourse}
                  />
                ))
              ) : null}
            </tbody>
          </table>
        </div>
        {courses?.length !== 0 && Number(limit) !== totalData && !filter ? (
          <PaginationButton
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            totalData={totalData}
            limit={limit}
          />
        ) : null}
      </div>

      {showModal && (
        <ModalCreateCourse
          onClose={() => setShowModal(false)}
          token={token}
          mutate={mutate}
          setShowModal={setShowModal}
        />
      )}
    </div>
  )
}
