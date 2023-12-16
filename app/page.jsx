import React from 'react';
import Image from 'next/image';
import NavBar from '@/components/navbar/Navbarlp';
import Footer from '@/components/footer/Footer';

import { FaStar } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import Carousel from '@/components/carousel/Carousel';

const allCourses = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/courses`);
    const data = await res.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

const LandingPage = async () => {
  const courses = await allCourses();

  return (
    <div className="overflow-x-hidden font-Montserrat">
      <NavBar />

      {/* HEADER */}
      <div className="flex flex-col gap-5 p-5 mb-10 md:flex-col lg:flex-row ">
        {/* KIRI */}
        <div className="mx-auto leading-none font-Montserrat lg:ml-10 xl:ml-0 ">
          {/* KIRI */}
          <div className="flex gap-5 ">
            <h1 className="text-orange-05 md:text-[60px] lg:text-60px] xl:text-[60px] text-[40px] max-[376px]:text-[37px] font-bold">
              Preducation
            </h1>
            <h1 className="md:text-[70px] text-[36px]  font-semibold text-orange-05 xl:text-[70px] max-[380px]:text-[27px]">
              + + +
            </h1>
            <br />
          </div>
          <div>
            <h1 className="md:text-[52px] text-[30px] font-semibold text-primary-dark-blue">Dari Praktisi Terbaik!</h1>
          </div>
          <div>
            <p className="mt-1 leading-loose text-[14px] md:text-[20px]">
              Mari bersama-sama menjelajahi dunia pembelajaran yang menyenangkan <br /> dan menginspirasi. Bergabunglah
              hari ini dan mulailah menggapai sukses!
            </p>
          </div>
          {/* BUTTON BERGABUNG */}
          <button className="bergabungBtn bg-orange-05 p-5 text-white rounded-[10px] mt-2 font-bold">
            Bergabung Sekarang
          </button>
        </div>

        {/* KANAN */}
        <div className="mx-auto">
          {/* GAMBAR */}
          <Image
            src="/object.svg"
            width={500}
            height={500}
            alt="gambar w-full w-auto md:mx-auto h-auto object-contain flex-shrink-0"
            priority={true}
          />
        </div>
      </div>

      {/* SEARCH BAR */}
      <form className="justify-center place-content-center">
        <div className="relative mx-auto bg-primary-dark-blue w-[300px] md:w-[500px] rounded-[15px] h-[60px] px-5 py-4  flex mb-10 justify-between">
          <div className="flex gap-2">
            {/* ICON */}
            <Image
              src="/search.svg"
              width={20}
              height={20}
              alt=""
              className="md:w-[50px] w-[15px] h-auto"
            />
            <input
              className="text-white bg-primary-dark-blue text-[10px] md:text-[16px] mt-2 md:mt-0 leading-loose focus:outline-none active:outline-none md:w-[300px]"
              placeholder="Temukan Kursus..."
            />
          </div>

          <button className=" text-white bg-orange-05 rounded-[10px] absolute  px-7 py-2 top-[14px] right-3 text-[10px] md:text-[14px] md:top-[10px]">
            Cari
          </button>
        </div>
      </form>

      {/* KURSUS POPULER */}
      <div>
        <div className="text-center">
          <h1 className="text-orange-05 md:text-[36px] text-[24px] font-semibold">Kursus Populer</h1>
          <p>
            Belajar Menyediakan berbagai macam kelas yang sudah berbasis industri untuk <br /> meningkatkan keterampilan
            digital kamu.
          </p>
        </div>

        {/* KOTAK KURSUS POPULER */}
        <div className="flex  mx-auto flex-wrap md:flex-row sm:flex-col md:gap-5 gap-10 flex-shrink-0 px-5 mb-[100px] mt-10 ">
          {courses.data.map((course) => {
            return (
              <div
                className="relative mx-auto "
                key={course._id}
              >
                <div className=" relative container flex flex-col  bg-primary-dark-blue md:w-[290px] md:h-[326px] rounded-[15px] md:p-5 p-10 pb-8  z-10 mx-auto mb-10 ">
                  {/* GAMBAR */}
                  <Image
                    src={course.thumbnail}
                    width={263}
                    height={153}
                    alt=""
                    priority={true}
                    className="h-auto mx-auto"
                  />
                  {/* CONTENT */}
                  <div className="flex justify-between mt-2">
                    {/* TITLE */}
                    <h1 className="text-white text-[11px] font-bold">{course.title}</h1>
                    {/* BINTANG */}
                    <div className="flex bintang">
                      <FaStar className={course.totalRating >= 1 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 2 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 3 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 4 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                      <FaStar className={course.totalRating >= 5 ? 'text-bintang-hidup' : 'text-bintang-mati'} />
                    </div>
                  </div>
                  {/* HARGA */}
                  <div className="text-xl text-white harga">Rp. {course.price}</div>
                  <hr className="border-dotted border-[1px] mt-1 mb-2" />
                  {/* WAKTU COURSE MODUL */}
                  <div className="flex gap-2">
                    {/* WAKTU */}
                    <div className="flex gap-1">
                      <IoTimeOutline color="white" />
                      <p className="text-white text-[11px]">{`${course.totalDuration} Jam`}</p>
                    </div>
                    {/* COURSES */}
                    <div className="flex gap-1">
                      <p className="text-white text-[12px]">{` ${course.level}`}</p>
                    </div>
                    {/* MODUL */}
                    <div className="flex gap-1">
                      <Image
                        src="/modul.svg"
                        width={10}
                        height={10}
                        className="w-auto"
                        alt="modul"
                      />
                      <p className="text-white text-[12px]">{`${course.totalModule} Modul`}</p>
                    </div>
                  </div>
                </div>
                {/* BUTTON */}
                <button className="relative font-bold bg-orange-05 py-4 px-16 top-[-60px]  md:top-[-55px] text-white rounded-[10px] z-30 md:left-14  left-20">
                  Daftar
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ULASAN */}
      <div className="text-center md:mb-5]">
        <h1 className="text-orange-05 md:text-[44px] text-[24px]  font-semibold">Ulasan</h1>
        <p className="md:text-[24px]">Pengalaman Belajar Alumni</p>
      </div>
      <Carousel />

      {/* DAPATKAN APLIKASI DI GOOGLEPLAY */}
      <div className="flex p-3">
        <div className="flex mx-auto">
          <div className="flex flex-col mx-auto relative p-5 mt-[50px]">
            <h1 className="font-bold text-orange-05 md:text-[32px] ">Dapatkan Aplikasi Kami Di</h1>
            <div>
              <a href="#">
                <Image
                  src="/googlePlay.svg"
                  width={200}
                  height={200}
                  alt="gambar google play"
                  className="float-right w-auto h-auto"
                />
              </a>
            </div>
          </div>
          <div className="">
            <Image
              src="/hp.svg"
              height={200}
              width={200}
              alt=""
              className="w-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
