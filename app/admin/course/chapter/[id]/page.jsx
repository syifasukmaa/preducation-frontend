'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AddButton from '@/components/button/AddButton';
import SearchButton from '@/components/button/SearchButton';
import FilterPopup from '@/components/popup/FilterPopup';
import Checkbox from '../../components/Checkbox';
import ActionButton from '@/components/button/ActionButton';
import ModalChapter from '../../components/ModalChapter';
import SearchPopup from '@/components/popup/SearchPopup';
import ChapterLoading from '@/components/loading/ChapterLoading';
import { useCourse } from '@/utils/swr';
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert';
import { deleteChapter } from '@/utils/fetch';
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert';

export default function Page() {
  const params = useParams();
  const idCourse = params.id;

  const [showElements, setShowElements] = useState({
    showInput: false,
  });
  const [title, setTitle] = useState('');
  const [Id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { course, isLoading, mutate, error } = useCourse(token, idCourse, null, null);

  const router = useRouter();

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/video/${chapterId}`);
  };

  const handleEditChapter = (id) => {
    setEditMode(true);
    setShowModal(true);
    setId(id);
  };

  const handleAddChapter = (id) => {
    setEditMode(false);
    setShowModal(true);
    setId(id);
  };

  const handleDeleteChapter = async (id) => {
    const isConfirmed = await ConfirmDeleteAlert('Delete Course');

    if (isConfirmed) {
      const response = await deleteChapter(token, id);
      if (response.ok) {
        mutate();
        DeleteSuccessAlert('Chapter');
      }
    }
  };
  const searchChapter = (chapter) => {
    const titleLower = title.toLowerCase();

    const isTitleMatch = chapter.title?.toLowerCase().includes(titleLower);
    return isTitleMatch;
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showModal]);

  return (
    <div className={`md:px-12 px-4`}>
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold">Kelola Chapter</p>
        <div className="relative flex items-center">
          <AddButton onClick={() => handleAddChapter(idCourse)} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup
              onClick={() => setShowElements({ ...showElements, showInput: false })}
              title={title}
              setTitle={setTitle}
            />
          )}
        </div>

        {showElements.showFilter && (
          <FilterPopup clickClose={() => setShowElements({ ...showElements, showFilter: false })}>
            <Checkbox label="Data Science" />
            <Checkbox label="Web Development" />
            <Checkbox label="Android Development" />
            <Checkbox label="UI/UX Design" />
            <Checkbox label="Product Management" />
          </FilterPopup>
        )}
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="text-xs font-semibold bg-orange-04 text-neutral-05">
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
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <span>{`Error: ${error}`}</span>
                    </div>
                  </td>
                </tr>
              ) : course && course.chapters && course.chapters.length <= 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-xl">Data chapter masih kosong</span>
                    </div>
                  </td>
                </tr>
              ) : course && course.chapters ? (
                course.chapters
                  .filter((chapter) => searchChapter(chapter))
                  .map((chapter, index) => (
                    <tr key={chapter._id}>
                      <td className="px-4 py-4 font-bold text-gray-05">{index + 1}</td>
                      <td className="px-4 py-4 font-bold text-gray-04">{chapter.title}</td>
                      <td className="px-4 py-4 font-bold text-gray-04">{chapter.totalDuration}</td>
                      <td className="px-4 py-3 font-bold whitespace-pre-wrap text-gray-04 lg:whitespace-nowrap">
                        {chapter.videos?.map((link, index) => (
                          <div
                            key={link._id}
                            className="text-orange-05"
                          >
                            <a
                              href={link.videoUrl}
                              target="_blank"
                              className="hover:text-dark-blue-05"
                            >
                              {link.videoUrl}
                            </a>
                          </div>
                        ))}
                      </td>
                      <td className="grid px-4 py-3 font-bold xl:grid-cols-3">
                        <ActionButton
                          styles={'bg-secondary-dark-blue hover:border-secondary-dark-blue'}
                          onClick={() => goToChapter(chapter._id)}
                        >
                          Video
                        </ActionButton>
                        <ActionButton
                          styles={'bg-light-green hover:border-light-green'}
                          onClick={() => handleEditChapter(chapter._id)}
                        >
                          Ubah
                        </ActionButton>
                        <ActionButton
                          styles={'bg-alert-red hover:border-alert-red'}
                          onClick={() => handleDeleteChapter(chapter._id)}
                        >
                          Hapus
                        </ActionButton>
                      </td>
                    </tr>
                  ))
              ) : (
                [...Array(8)].map((_, index) => <ChapterLoading key={index} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ModalChapter
          onClose={() => setShowModal(false)}
          editMode={editMode}
          token={token}
          Id={Id}
          mutate={mutate}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
