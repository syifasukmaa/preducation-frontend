'use client';
import React, { useState } from 'react';
import SearchButton from '@/components/button/SearchButton';
import FilterButton from '@/components/button/FilterButton';
import FilterPopup from '@/components/popup/FilterPopup';
import SearchPopup from '@/components/popup/SearchPopup';
import { useSession } from 'next-auth/react';
import { usePayment } from '@/utils/swr';
import PaymentLoading from '@/components/loading/PaymentLoading';

export default function Page() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { payment: payments, isLoading, error } = usePayment(token, null);

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
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold text-primary-dark-blue">Status Pembayaran</p>
        <div className="relative flex items-center">
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

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="text-xs font-semibold bg-orange-04 text-neutral-05">
              <tr>
                <td className="px-4 py-3">ID</td>
                <td className="px-4 py-3">Kategori</td>
                <td className="px-4 py-3">Kelas Premium</td>
                <td className="px-4 py-3">Status</td>
                <td className="px-4 py-3 lg:pl-4 lg:pr-0">Metode Pembayaran</td>
                <td className="px-4 py-3 pl-4 lg:pl-0 lg:pr-1">Tanggal Bayar</td>
              </tr>
            </thead>

            <tbody className="text-gray-700 whitespace-nowrap text-[10px]">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <PaymentLoading key={index} />
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
              ) : payments ? (
                payments
                  .filter((payment) => filterPayments(payment, showElements.filter))
                  .map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-4 py-4 font-bold text-gray-05">{payment.userId.username}</td>
                      <td className="py-3 pl-4 pr-3 font-bold text-gray-05">{payment.courseId.category.name}</td>
                      <td className="px-4 py-3 font-bold text-gray-04">{payment.courseId.level}</td>
                      <td
                        className={`py-3 px-4 font-bold ${
                          payment.status === 'On Progress' ? 'text-alert-red' : 'text-alert-green'
                        }`}
                      >
                        {payment.status}
                      </td>
                      <td className="px-4 py-3 font-bold lg:pl-4 lg:pr-0 text-gray-04">{payment.paymentType}</td>
                      <td className="px-4 py-3 pl-4 font-bold lg:pl-0 lg:pr-1 text-gray-05">{payment.createdAt}</td>
                    </tr>
                  ))
              ) : (
                [...Array(5)].map((_, index) => <PaymentLoading key={index} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
