'use client';
import React, { useState } from 'react';
import { useCourse } from '@/utils/swr';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import formatToCurrency from '@/utils/convert';
import { IoDiamondOutline, IoTimer, IoSpeedometerOutline } from 'react-icons/io5';
import { FaUsers, FaRegUser } from 'react-icons/fa';
import { MdOutlineUploadFile } from 'react-icons/md';
import { FaStar } from 'react-icons/fa6';
import ModalCourse from '../components/ModalCourse';
import DetailCourseLoading from '@/components/loading/DetailCourseLoading';

export default function page() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { id } = useParams();
  const { course, error, isLoading, mutate } = useCourse(token, id);

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courseId, setCourseId] = useState(null);

  const goToChapter = () => {
    router.push(`/admin/course/chapter/${id}`);
  };
  const handleEditCourse = (courseId) => {
    setEditMode(true);
    setShowModal(true);
    setCourseId(courseId);
  };

  return (
    <div className={`md:px-12 px-4 mt-6`}>
      <p className="text-2xl font-bold">Detail Course</p>
      {course ? (
        <>
          <div className="items-center justify-between p-4 mt-4 bg-white border rounded-lg shadow-xl border-slate-900 lg:flex">
            <div className="flex order-1 mb-4 mr-4 text-sm lg:order-2 lg:flex-col lg:mb-0 lg:ml-4">
              <button
                onClick={goToChapter}
                className="px-4 py-2 font-bold text-white rounded-md bg-secondary-dark-blue"
              >
                Chapter
              </button>
              <button
                onClick={() => handleEditCourse(course._id)}
                className="px-4 py-2 ml-2 font-bold text-white rounded-md w-[98px] lg:ml-0 lg:mt-2 bg-light-green"
              >
                Ubah
              </button>
            </div>
            <div className="flex flex-col items-center order-2 lg:items-center lg:order-1 md:flex-row">
              {course?.thumbnail && (
                <Image
                  width={350}
                  height={200}
                  src={course.thumbnail}
                  alt="course thumbnail"
                  priority={true}
                  className="rounded-lg w-[350px] h-[200px] md:w-[250px] md:h-[200px] lg:w-[300px] lg:h-[180px] mx-auto md:mx-0 shadow-lg"
                />
              )}

              <div className="flex flex-col my-4 md:ml-4">
                <p className="mb-2 text-xl font-semibold lg:text-2xl text-orange-05">{course?.classCode}</p>
                <p className="mb-2 text-lg font-medium lg:text-xl">{course?.category.name}</p>
                <p className="mb-2 text-base lg:text-lg text-orange-05">{course?.title}</p>
                <p className="text-sm text-neutral-03">{formatToCurrency(course?.price)}</p>
                <p className="flex mt-2 text-lg text-neutral-03">
                  <FaStar className={course?.totalRating >= 1 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                  <FaStar className={course?.totalRating >= 2 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                  <FaStar className={course?.totalRating >= 3 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                  <FaStar className={course?.totalRating >= 4 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                  <FaStar className={course?.totalRating >= 5 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between mt-10 mb-5 lg:flex-row">
            <div className="lg:w-3/5">
              <div>
                <h2 className="text-xl font-semibold text-orange-05">Tentang Kelas</h2>
                <p className="mt-2 text-justify">{course?.description}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-orange-05">Kelas Ini Ditunjukan Untuk</h2>
                {course?.targetAudience ? (
                  <div className="mt-2 text-justify">
                    {course.targetAudience.map((item, index) => (
                      <p
                        key={index}
                        className="mt-1.5"
                      >
                        <span>
                          {item.substring(0, 2)} {''}
                        </span>
                        <span className="mt-2">{item.substring(2)}</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p>Informasi audience tidak tersedia</p>
                )}
              </div>
            </div>
            <div className="xl:px-[60px] py-6 lg:py-10 border border-black rounded-lg shadow-lg w-full px-[90px] md:w-1/2 md:px-[35px] lg:w-[25%] lg:h-3/5 mt-8 lg:mt-0">
              <div className="flex items-center mb-4">
                <IoDiamondOutline size={20} />
                <p className="ml-6 font-medium">{course?.typeClass}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaUsers size={20} />
                <p className="ml-6 font-medium">{course?.sold} Peserta</p>
              </div>
              <div className="flex items-center mb-4">
                <IoSpeedometerOutline size={20} />
                <p className="ml-6 font-medium">{course?.level}</p>
              </div>
              <div className="flex items-center mb-4">
                <MdOutlineUploadFile size={20} />
                <p className="ml-6 font-medium">{course?.totalModule} Modul</p>
              </div>
              <div className="flex items-center ">
                <IoTimer size={20} />
                <p className="ml-6 font-medium">{`${(course?.totalDuration / 60).toFixed(1)} Jam`}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <DetailCourseLoading />
      )}

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
