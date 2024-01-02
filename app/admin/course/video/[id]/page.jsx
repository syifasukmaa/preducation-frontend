'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import AddButton from '@/components/button/AddButton'
import SearchButton from '@/components/button/SearchButton'
import SearchPopup from '@/components/popup/SearchPopup'
import ModalVideo from './components/ModalVideo'
import VideoLoading from '@/components/loading/VideoLoading'
import { useChapter } from '@/utils/swr'
import { deleteVideo } from '@/utils/fetch'
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert'
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert'
import ErrorData from '@/components/ErrorData'
import VideoList from './components/VideoList'

export default function Page() {
  const [title, setTitle] = useState('')
  const [Id, setId] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showElements, setShowElements] = useState({
    showInput: false,
  })

  const params = useParams()
  const idChapter = params.id

  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const { data: chapter, mutate, isLoading, error } = useChapter(token, idChapter)

  const handleEditVideo = (id) => {
    setEditMode(true)
    setShowModal(true)
    setId(id)
  }

  const handleAddVideo = (id) => {
    setEditMode(false)
    setShowModal(true)
    setId(id)
  }

  const handleSearch = (e) => {
    setTitle(e.target.value)
  }

  const handleDeleteVideo = async (id) => {
    const isConfirmed = await ConfirmDeleteAlert('Delete Video')
    if (isConfirmed) {
      const response = await deleteVideo(token, id)
      if (response.ok) {
        mutate()
        DeleteSuccessAlert('Video')
      }
    }
  }

  const searchVideos = (video) => {
    const titleLower = title.toLowerCase()
    const isTitleMatch = video?.title.toLowerCase().includes(titleLower)
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
        <p className="text-xl font-bold dark:text-dark-grey-02">Kelola Video</p>
        <div className="relative flex items-center">
          <AddButton onClick={() => handleAddVideo(idChapter)} />
          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />
          {showElements.showInput && (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={title}
              handleChange={handleSearch}
            />
          )}
        </div>
      </div>
      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg dark:bg-dark-backgroud">
            <thead className="text-sm font-semibold bg-orange-04 dark:bg-dark-grey-04 dark:text-dark-grey-05 text-neutral-05">
              <tr className="">
                <th className="p-4 text-left">No</th>
                <th className="p-4 text-left w-72">Nama Video</th>
                <th className="p-4 text-left">Total Durasi</th>
                <th className="p-4 text-left">Index</th>
                <th className="px-4 py-3 text-left">Video</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-[10px]">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <VideoLoading key={index} />
                  ))}
                </>
              ) : error ? (
                <ErrorData error={error} />
              ) : chapter && chapter.videos && chapter.videos.length <= 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center md:items-start md:flex-row">
                      <Image
                        src='/img/empty_3d.png'
                        width={80}
                        height={80}
                        alt="empty image"
                        className="w-[80px] h-[80px] mt-2"
                        priority="true"
                      />
                      <div className="ml-4 md:text-start">
                        <p className="mt-4 text-xl font-bold text-orange-05">Video masih kosong</p>
                        <p className="mt-1 text-base dark:text-dark-grey-02">
                          Cobalah untuk{' '}
                          <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => handleAddVideo(idChapter)}
                          >
                            menambahkan video
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : chapter && chapter.videos ? (
                chapter.videos
                  .filter((video) => searchVideos(video))
                  .map((video, index) => {
                    return (
                      <VideoList
                        key={video._id}
                        handleDeleteVideo={handleDeleteVideo}
                        handleEditVideo={handleEditVideo}
                        index={index}
                        video={video}
                      />
                    )
                  })
              ) : (
                [...Array(3)].map((_, index) => <VideoLoading key={index} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal ? (
        <ModalVideo
          onClose={() => setShowModal(false)}
          editMode={editMode}
          token={token}
          mutate={mutate}
          Id={Id}
          chapterId={idChapter}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  )
}
