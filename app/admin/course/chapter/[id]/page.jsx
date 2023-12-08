'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import AddButton from '@/components/button/AddButton';
import SearchButton from '@/components/button/SearchButton';
import FilterPopup from '@/components/popup/FilterPopup';
import Checkbox from '../../components/Checkbox';
import ActionButton from '@/components/button/ActionButton';
import ModalChapter from '../../components/ModalChapter';
import SearchPopup from '@/components/popup/SearchPopup';
import { useSession } from 'next-auth/react';
import { useCourse } from '@/utils/swr';

export default function Page() {
  const params = useParams();
  const idCourse = params.id;

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { course, isLoading, mutate } = useCourse(token, idCourse, null, null);

  const router = useRouter();

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/video/${chapterId}`);
  };

  const [showElements, setShowElements] = useState({
    showInput: false,
  });

  const [Id, setId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Kelola Chapter</p>
        <div className="flex items-center relative">
          <AddButton onClick={() => handleAddChapter(idCourse)} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup onClick={() => setShowElements({ ...showElements, showInput: false })} />
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

      <div className="overflow-x-auto mt-4 mb-24 lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-orange-04 font-semibold text-neutral-05 text-xs">
              <tr className="text-left">
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nama Chapter</th>
                <th className="py-3 px-4">Total Durasi</th>
                <th className="py-3 px-4">Link Video</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="text-gray-700  text-[10px]">
              {isLoading ? (
                <tr>
                  <td colSpan="5">
                    <p className="text-xl">Loading...</p>
                  </td>
                </tr>
              ) : (
                course &&
                course.chapters &&
                course.chapters.map((chapter, index) => (
                  <tr key={chapter._id}>
                    <td className="py-4 px-4 font-bold text-gray-05">{chapter._id}</td>
                    <td className="py-4 px-4 font-bold text-gray-04">{chapter.title}</td>
                    <td className="py-4 px-4 font-bold text-gray-04">{chapter.totalDuration}</td>
                    <td className="py-3 px-4 font-bold text-gray-04 lg:whitespace-nowrap whitespace-pre-wrap">
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
                    <td className="py-3 px-4 font-bold grid xl:grid-cols-2">
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
                    </td>
                  </tr>
                ))
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
        />
      )}
    </div>
  );
}
