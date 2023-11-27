'use client';
import React, { useState } from 'react';
import Courses from '@/data/Coursesdummy.json';
import SearchButton from '@/components/button/SearchButton';
import FilterButton from '@/components/button/FilterButton';
import FilterPopup from '@/components/popup/FilterPopup';
import SearchPopup from '@/components/popup/SearchPopup';
import AddButton from '@/components/button/AddButton';
import ActionButton from '@/components/button/ActionButton';
import Checkbox from './components/Checkbox';

export default function Page() {
  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
  });

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Kelola Kelas</p>
        <div className="flex items-center relative">
          <AddButton />

          <FilterButton
            onClick={() =>
              setShowElements({ ...showElements, showFilter: true })
            }
          />

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
            clickClose={(clickClose) =>
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
                <td className="py-3 px-4">Kode Kelas</td>
                <td className="py-3 px-4">Kategori</td>
                <td className="py-3 px-4">Nama Kelas</td>
                <td className="py-3 px-4">Tipe Kelas</td>
                <td className="py-3 px-4">Level</td>
                <td className="py-3 px-4">Harga Kelas</td>
                <td className="py-3 px-4">Aksi</td>
              </tr>
            </thead>
            <tbody className="text-gray-700  text-[10px]">
              {Courses.map((course) => (
                <tr key={course.id}>
                  <td className="py-4 px-4 font-bold text-gray-05">
                    {course.KodeKelas}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-05 w-[10%]">
                    {course.Kategori}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-04 lg:whitespace-nowrap whitespace-pre-wrap">
                    {course.NamaKelas}
                  </td>
                  <td
                    className={`py-3 px-4 font-bold ${
                      course.TipeKelas === 'PREMIUM'
                        ? 'text-dark-blue-05'
                        : 'text-alert-green'
                    }`}
                  >
                    {course.TipeKelas}
                  </td>
                  <td className="py-3 px-4 font-bold text-black w-[12%]">
                    {course.Level}
                  </td>
                  <td className="py-3 px-4 font-bold text-black">
                    Rp {course.HargaKelas}
                  </td>
                  <td className="py-3 px-4 font-bold">
                    <ActionButton styles={'bg-alert-green'}>
                      Chapter
                    </ActionButton>
                    <ActionButton styles={'bg-dark-blue-05'}>Ubah</ActionButton>
                    <ActionButton styles={'bg-alert-red'}>Hapus</ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
