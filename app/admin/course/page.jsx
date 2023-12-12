'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SearchButton from '@/components/button/SearchButton';
import FilterButton from '@/components/button/FilterButton';
import FilterPopup from '@/components/popup/FilterPopup';
import SearchPopup from '@/components/popup/SearchPopup';
import AddButton from '@/components/button/AddButton';
import ActionButton from '@/components/button/ActionButton';
import Checkbox from './components/Checkbox';
import ModalCourse from './components/ModalCourse';
import CourseLoading from '@/components/loading/CourseLoading';
import formatToCurrency from '@/utils/convert';
import { useCourse } from '@/utils/swr';
import { deleteCourse } from '@/utils/fetch';
import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert';
import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert';

export default function Page() {
  const [title, setTitle] = useState('');
  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    'Data Science': false,
    'Web Development': false,
    'Android Development': false,
    'UI/UX Design': false,
    'Data Science': false,
    'Ios Developmet': false,
    'Product Management': false,
  });

  const selectedCategoryKeys = Object.entries(selectedCategories)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const router = useRouter();

  const { course: courses, isLoading, mutate, error } = useCourse(token, null, selectedCategoryKeys, title);

  const goToChapter = (chapterId) => {
    router.push(`/admin/course/chapter/${chapterId}`);
  };

  const handleAddCourse = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditCourse = (courseId) => {
    setEditMode(true);
    setShowModal(true);
    setCourseId(courseId);
  };

  const handleDeleteCourse = async (courseId) => {
    const isConfirmed = await ConfirmDeleteAlert('Delete Chapter');

    if (isConfirmed) {
      const response = await deleteCourse(token, courseId);
      if (response.ok) {
        mutate();
        DeleteSuccessAlert('Course');
      }
    }
  };

  const handleCheckboxChange = (label) => {
    setSelectedCategories({
      ...selectedCategories,
      [label]: !selectedCategories[label],
    });
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
        <p className="text-xl font-bold">Kelola Kelas</p>
        <div className="relative flex items-center">
          <AddButton onClick={() => handleAddCourse()} />

          <FilterButton onClick={() => setShowElements({ ...showElements, showFilter: true })} />

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
            <Checkbox
              label="Data Science"
              checked={selectedCategories['Data Science']}
              onChange={() => handleCheckboxChange('Data Science')}
            />
            <Checkbox
              label="Web Development"
              checked={selectedCategories['Web Development']}
              onChange={() => handleCheckboxChange('Web Development')}
            />
            <Checkbox
              label="Android Development"
              checked={selectedCategories['Android Development']}
              onChange={() => handleCheckboxChange('Android Development')}
            />
            <Checkbox
              label="IOS Development"
              checked={selectedCategories['Ios Developmet']}
              onChange={() => handleCheckboxChange('Ios Developmet')}
            />
            <Checkbox
              label="UI/UX Design"
              checked={selectedCategories['UI/UX Design']}
              onChange={() => handleCheckboxChange('UI/UX Design')}
            />
            <Checkbox
              label="Product Management"
              checked={selectedCategories.productManagement}
              onChange={() => handleCheckboxChange('Product Management')}
            />
          </FilterPopup>
        )}
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="text-xs font-semibold bg-orange-04 text-neutral-05">
              <tr>
                <th className="px-4 py-3 text-left">Kode Kelas</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Nama Kelas</th>
                <th className="px-4 py-3 text-left">Tipe Kelas</th>
                <th className="px-4 py-3 text-left">Level</th>
                <th className="px-4 py-3 text-left">Harga Kelas</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody className="text-[10px]">
                {[...Array(8)].map((_, index) => (
                  <CourseLoading key={index} />
                ))}
              </tbody>
            ) : error ? (
              <tbody className="text-[10px]">
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
              </tbody>
            ) : (
              <tbody className="text-gray-700 text-[10px]">
                {courses
                  ? courses.map((course) => (
                      <tr key={course._id}>
                        <td className="px-4 py-4 font-bold text-gray-05">{course.classCode}</td>
                        <td className="py-3 px-4 font-bold text-gray-05 w-[10%]">{course.category.name}</td>
                        <td className="py-3 px-4 font-bold text-gray-04 lg:w-[25%] whitespace-pre-wrap">
                          {course.title}
                        </td>
                        <td
                          className={`py-3 px-4 font-bold ${
                            course.typeClass === 'PREMIUM' ? 'text-orange-05' : 'text-alert-green'
                          }`}
                        >
                          {course.typeClass}
                        </td>
                        <td className="py-3 px-4 font-bold text-black w-[12%]">{course.level}</td>
                        <td className="px-4 py-3 font-bold text-black">{formatToCurrency(course.price)}</td>
                        <td className="grid px-4 py-3 font-bold xl:grid-cols-3">
                          <ActionButton
                            styles={'bg-light-green hover:border-light-green'}
                            onClick={() => goToChapter(course._id)}
                          >
                            Chapter
                          </ActionButton>
                          <ActionButton
                            styles={'bg-dark-blue-05 hover:border-dark-blue-05'}
                            onClick={() => handleEditCourse(course._id)}
                          >
                            Ubah
                          </ActionButton>
                          <ActionButton
                            styles={'bg-alert-red hover:border-alert-red'}
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            Hapus
                          </ActionButton>
                        </td>
                      </tr>
                    ))
                  : [...Array(8)].map((_, index) => <CourseLoading key={index} />)}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {showModal && (
        <div>
          <ModalCourse
            onClose={() => setShowModal(false)}
            editMode={editMode}
            token={token}
            mutate={mutate}
            courseId={courseId}
            setShowModal={setShowModal}
          />
        </div>
      )}
    </div>
  );
}
