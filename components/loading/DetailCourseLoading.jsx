import React from 'react';

export default function DetailCourseLoading() {
  return (
    <>
      <div className="items-center justify-between p-4 mt-4 bg-white border rounded-lg shadow-xl border-slate-900 lg:flex animate-pulse">
        <div className="flex order-1 mb-4 mr-4 text-sm lg:px-0 lg:order-2 lg:flex-col lg:mb-0 lg:ml-4">
          <div className="w-24 h-10 bg-gray-300 rounded-md"></div>
          <div className="w-24 h-10 ml-2 bg-gray-300 rounded-md lg:mt-2 lg:ml-0"></div>
        </div>
        <div className="items-center justify-between bg-white rounded-lg md:flex animate-pulse">
          <div className="w-[280px] h-[150px] md:w-[350px] md:h-[200px] lg:w-[300px] lg:h-[180px] rounded-lg bg-gray-300 mx-auto md:mx-0 flex-auto"></div>

          <div className="flex flex-col flex-1 px-2 my-4 md:ml-4">
            <div className="w-[100px] h-8 bg-gray-300 rounded mb-2"></div>
            <div className="w-[150px] h-6 bg-gray-300 rounded mb-2"></div>
            <div className="w-[250px] h-8 bg-gray-300 rounded mb-2"></div>
            <div className="w-[100px] h-4 bg-gray-300 rounded"></div>

            <div className="flex mt-2">
              <div className="w-4 h-4 mr-1 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 mr-1 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 mr-1 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 mr-1 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between mt-10 mb-5 lg:flex-row">
        <div className="lg:w-3/5">
          <div>
            <div className="w-48 h-8 mb-4 bg-gray-300 rounded-md"></div>
            <div className="w-full h-32 mb-8 bg-gray-300 rounded-md"></div>
            <div className="w-48 h-8 mb-4 bg-gray-300 rounded-md"></div>
            <div className="w-1/2 h-5 bg-gray-300 rounded-md"></div>
            <div className="w-3/4 h-5 mt-1 bg-gray-300 rounded-md"></div>
            <div className="w-3/5 h-5 mt-1 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <div className="xl:px-[75px] py-6 lg:py-10 border border-black rounded-lg shadow-lg w-full px-[90px] md:w-1/2 md:px-[35px] lg:w-[25%] lg:h-3/5 mt-8 lg:mt-0">
          <div className="w-32 h-6 mb-4 bg-gray-300 rounded-md"></div>
          <div className="w-32 h-6 mb-4 bg-gray-300 rounded-md"></div>
          <div className="w-32 h-6 mb-4 bg-gray-300 rounded-md"></div>
          <div className="w-32 h-6 mb-4 bg-gray-300 rounded-md"></div>
          <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </>
  );
}
