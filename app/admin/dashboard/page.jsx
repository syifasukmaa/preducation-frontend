'use client';
import React, { useState } from 'react';
import Courses from '@/data/Coursedummy.json';
import SearchButton from '@/components/button/SearchButton';
import FilterButton from '@/components/button/FilterButton';
import FilterPopup from '@/components/popup/FilterPopup';

import SearchPopup from '@/components/popup/SearchPopup';

export default function Page() {
  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
  });

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Status Pembayaran</p>
        <div className="flex items-center relative">
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
            <p
              className="item-filter"
              onClick={() => console.log('sudah bayar')}
            >
              Sudah Bayar
            </p>
            <hr />
            <p
              className="item-filter"
              onClick={() => console.log('belum bayar')}
            >
              Belum Bayar
            </p>
          </FilterPopup>
        )}
      </div>

      <div className="overflow-x-auto mt-4 mb-24 lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-light-blue-05 font-semibold text-neutral-05 text-xs">
              <tr>
                <td className="py-3 px-4">ID</td>
                <td className="py-3 px-4">Kategori</td>
                <td className="py-3 px-4">Kelas Premium</td>
                <td className="py-3 px-4">Status</td>
                <td className="py-3 px-4 lg:pl-4 lg:pr-0">Metode Pembayaran</td>
                <td className="py-3 px-4 lg:pl-0 lg:pr-1 pl-4">
                  Tanggal Bayar
                </td>
              </tr>
            </thead>
            <tbody className="text-gray-700 whitespace-nowrap text-[10px]">
              {Courses.map((course) => (
                <tr key={course.id}>
                  <td className="py-4 px-4 font-bold text-gray-05">
                    {course.ID}
                  </td>
                  <td className="py-3 pl-4 pr-3 font-bold text-gray-05">
                    {course.Kategori}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-04">
                    {course.KelasPremium}
                  </td>
                  <td
                    className={`py-3 px-4 font-bold ${
                      course.Status === 'BELUM BAYAR'
                        ? 'text-alert-red'
                        : 'text-alert-green'
                    }`}
                  >
                    {course.Status}
                  </td>
                  <td className="py-3 px-4 lg:pl-4 lg:pr-0 font-bold text-gray-04">
                    {course.MetodePembayaran}
                  </td>
                  <td className="py-3 px-4 lg:pl-0 lg:pr-1 pl-4 font-bold text-gray-05">
                    {course.TanggalBayar}
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
