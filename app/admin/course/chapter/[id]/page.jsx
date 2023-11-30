'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Chapters from '@/data/Chapterdummy.json';
import AddButton from '@/components/button/AddButton';
import SearchButton from '@/components/button/SearchButton';
import FilterPopup from '@/components/popup/FilterPopup';
import Checkbox from '../../components/Checkbox';
import ActionButton from '@/components/button/ActionButton';
import ModalChapter from '../../components/ModalChapter';
import SearchPopup from '@/components/popup/SearchPopup';
ModalChapter;

export default function Page() {
  // const router = useParams();
  // const { id } = router;

  const router = useRouter();

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/video/${chapterId}`);
  };

  const [showElements, setShowElements] = useState({
    showInput: false,
  });

  const [editMode, setEditMode] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleEditChapter = () => {
    setEditMode(true);
    setShowModal(true);
  };

  const handleAddChapter = () => {
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Kelola Chapter</p>
        <div className="flex items-center relative">
          <AddButton onClick={() => handleAddChapter()} />

          <SearchButton
            onClick={() =>
              setShowElements({ ...showElements, showInput: true })
            }
          />

          {showElements.showInput && (
            <SearchPopup
              onClick={() =>
                setShowElements({ ...showElements, showInput: false })
              }
            />
          )}
        </div>

        {showElements.showFilter && (
          <FilterPopup
            clickClose={() =>
              setShowElements({ ...showElements, showFilter: false })
            }
          >
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
            <thead className="bg-light-blue-05 font-semibold text-neutral-05 text-xs">
              <tr>
                <td className="py-3 px-4">Id Chapter</td>
                <td className="py-3 px-4">Nama Chapter</td>
                <td className="py-3 px-4">Total Durasi</td>
                <td className="py-3 px-4">Link Video</td>
                <td className="py-3 px-4">Aksi</td>
              </tr>
            </thead>
            <tbody className="text-gray-700  text-[10px]">
              {Chapters.map((chapter) => (
                <tr key={chapter.id}>
                  <td className="py-4 px-4 font-bold text-gray-05">
                    {chapter.id}
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-04">
                    {chapter.NamaChapter}
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-04">
                    {chapter.TotalDurasi}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-04 lg:whitespace-nowrap whitespace-pre-wrap">
                    {chapter.LinkVideo.map((link) => (
                      <p key={chapter.id}>
                        <a
                          href={link}
                          target="_blank"
                          className="hover:text-dark-blue-05"
                        >
                          {link}
                        </a>
                      </p>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-bold">
                    <ActionButton
                      styles={'bg-alert-green'}
                      onClick={() => goToChapter(chapter.id)}
                    >
                      Video
                    </ActionButton>
                    <ActionButton
                      styles={'bg-dark-blue-05'}
                      onClick={() => handleEditChapter()}
                    >
                      Ubah
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ModalChapter
          onClose={() => setShowModal(false)}
          editMode={editMode}
        />
      )}
    </div>
  );
}
