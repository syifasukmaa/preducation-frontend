'use client';
import React, { useState } from 'react';
import SearchButton from '@/components/button/SearchButton';
import FilterButton from '@/components/button/FilterButton';
import FilterPopup from '@/components/popup/FilterPopup';
import SearchPopup from '@/components/popup/SearchPopup';
import { useSession } from 'next-auth/react';
import { usePayment } from '@/utils/swr';

export default function Page() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { payment: payments, isLoading } = usePayment(token, null);

  const [showElements, setShowElements] = useState({
    showFilter: false,
    showInput: false,
    filter: '',
  });

  const filterCourses = (filterOption) => {
    setShowElements({
      ...showElements,
      filter: filterOption,
      showFilter: false,
    });
  };

  const filterPayments = (payment, showFilter) => {
    if (showFilter === 'Paid') {
      return payment.status === 'paid';
    } else if (showFilter === 'On Progress') {
      return payment.status === 'On Progress';
    }
    return true;
  };
  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold text-primary-dark-blue">Status Pembayaran</p>
        <div className="flex items-center relative">
          <FilterButton onClick={() => setShowElements({ ...showElements, showFilter: true })} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup onClick={() => setShowElements({ ...showElements, showInput: false })} />
          )}
        </div>

        {showElements.showFilter && (
          <FilterPopup clickClose={() => setShowElements({ ...showElements, showFilter: false })}>
            <p
              className="item-filter"
              onClick={() => filterCourses('Paid')}
            >
              Paid
            </p>
            <hr />
            <p
              className="item-filter"
              onClick={() => filterCourses('On Progress')}
            >
              On Progress
            </p>
          </FilterPopup>
        )}
      </div>

      <div className="overflow-x-auto mt-4 mb-24 lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-orange-04 font-semibold text-neutral-05 text-xs">
              <tr>
                <td className="py-3 px-4">ID</td>
                <td className="py-3 px-4">Kategori</td>
                <td className="py-3 px-4">Kelas Premium</td>
                <td className="py-3 px-4">Status</td>
                <td className="py-3 px-4 lg:pl-4 lg:pr-0">Metode Pembayaran</td>
                <td className="py-3 px-4 lg:pl-0 lg:pr-1 pl-4">Tanggal Bayar</td>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="7">Loading</td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-gray-700 whitespace-nowrap text-[10px]">
                {payments &&
                  payments
                    .filter((payment) => filterPayments(payment, showElements.filter))
                    .map((payment) => (
                      <tr key={payment._id}>
                        <td className="py-4 px-4 font-bold text-gray-05">{payment.userId.username}</td>
                        <td className="py-3 pl-4 pr-3 font-bold text-gray-05">{payment.courseId.category.name}</td>
                        <td className="py-3 px-4 font-bold text-gray-04">{payment.courseId.level}</td>
                        <td
                          className={`py-3 px-4 font-bold ${
                            payment.status === 'On Progress' ? 'text-alert-red' : 'text-alert-green'
                          }`}
                        >
                          {payment.status}
                        </td>
                        <td className="py-3 px-4 lg:pl-4 lg:pr-0 font-bold text-gray-04">{payment.paymentType}</td>
                        <td className="py-3 px-4 lg:pl-0 lg:pr-1 pl-4 font-bold text-gray-05">{payment.createdAt}</td>
                      </tr>
                    ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
