'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { galleryContainerVariant, galleryVariant, slideIn } from '../../utils/motion';
import Link from 'next/link';

export default function CardCourse({ courses }) {
  const [title, setTitle] = useState('');
  const [filterCourses, setFilterCourses] = useState(courses);
  const [triger, setTriger] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setTriger(true);
    if (title.length === 0) {
      setFilterCourses(courses);
      setTriger(false);
    }
    const filteredCourse = courses.filter((course) => course.title.toLowerCase().includes(title.toLowerCase()));
    setFilterCourses(filteredCourse);
  };

  return (
    <>
      <motion.form
        className='justify-center place-content-center'
        onSubmit={handleSearch}
        variants={slideIn('up', 'tween', 0.6, 0.6)}
        initial='hidden'
        whileInView='show'
      >
        <div className='relative mx-auto bg-primary-dark-blue w-[300px] md:w-[500px] rounded-[15px] h-[60px] px-5 py-4  flex mb-10 justify-between'>
          <div className='flex gap-2'>
            <Image
              src='/search.svg'
              width={25}
              height={25}
              alt=''
              className='w-[25px] h-[25px]'
            />
            <input
              className='text-white bg-primary-dark-blue text-[10px] md:text-[16px] mt-2 md:mt-0 leading-loose focus:outline-none active:outline-none md:w-[300px]'
              placeholder='Temukan Kursus...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button
            className=' text-white bg-orange-05 hover:scale-95 rounded-[10px] absolute  px-7 py-2 top-[14px] right-3 text-[10px] md:text-[14px] md:top-[10px]'
            type='submit'
          >
            Cari
          </button>
        </div>
      </motion.form>

      <div id='course'>
        <motion.div
          variants={slideIn('up', 'tween', 0.6, 0.6)}
          initial='hidden'
          whileInView='show'
          className='text-center'
        >
          <h1 className='text-orange-05 md:text-[36px] text-[24px] font-semibold'>Kursus Populer</h1>
          <p className='px-12 md:px-6 dark:text-dark-grey-02'>
            Belajar Menyediakan berbagai macam kelas yang sudah berbasis industri untuk <br /> meningkatkan keterampilan
            digital kamu.
          </p>
        </motion.div>

        <motion.div
          variants={galleryContainerVariant}
          initial={triger ? 'visible' : 'hidden'}
          whileInView='show'
          className='px-5 mb-[100px] mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
          {filterCourses?.map((course) => {
            return (
              <div
                className='relative mx-auto'
                key={course._id}
              >
                <motion.div
                  variants={galleryVariant}
                  className=' relative container flex flex-col bg-primary-dark-blue md:w-[290px] md:h-[326px] rounded-[15px] md:p-5 p-10 pb-8  z-10 mx-auto mb-10 '
                >
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      width={263}
                      height={153}
                      alt={course.title}
                      priority={true}
                      className='w-[263px] h-[153px] rounded-lg'
                    />
                  ) : (
                    <div className='w-64 text-white h-36 md:h-36 bg-primary-dark-blue '>Image Kosong</div>
                  )}

                  <div className='flex flex-col justify-between mt-2'>
                    <h1 className='text-white text-[11px] font-bold mb-2'>{course.title}</h1>
                    <div
                      data-testid='star-container'
                      className='flex mb-2 bintang'
                    >
                      <FaStar className={course.totalRating >= 1 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 2 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 3 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 4 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 5 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                    </div>
                  </div>
                  <div className='text-xl text-white harga'>Rp. {course.price}</div>
                  <hr className='border-dotted border-[1px] mt-1 mb-2' />
                  <div className='flex gap-2 pb-4'>
                    <div className='flex gap-1'>
                      <IoTimeOutline color='white' />
                      <p className='text-white text-[11px]'>{`${course.totalDuration} Jam`}</p>
                    </div>
                    <div className='flex gap-1'>
                      <p className='text-white text-[12px]'>{` ${course.level}`}</p>
                    </div>
                    <div className='flex gap-1'>
                      <Image
                        src='/modul.svg'
                        width={10}
                        height={10}
                        alt='modul'
                        className='w-4 h-4'
                      />
                      <p className='text-white text-[12px]'>{`${course.totalModule} Modul`}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.span
                  variants={galleryVariant}
                  className='relative cursor-pointer font-bold hover:scale-95 bg-orange-05 py-4 px-16 top-[-60px]  md:top-[-55px] text-white rounded-[10px] z-30 md:left-14 left-20'
                >
                  <Link
                    href='https://drive.google.com/file/d/1RFhv-nI7x74oNpBPk6Hhag0j6Wb27yRk/view?usp=sharing'
                    target='_blank'
                  >
                    Daftar
                  </Link>
                </motion.span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}
