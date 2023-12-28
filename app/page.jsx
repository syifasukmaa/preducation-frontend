import React from 'react';
import Image from 'next/image';
import NavBar from '@/components/navbar/Navbarlp';
import Footer from '@/components/footer/Footer';
import Carousel from '@/components/carousel/Carousel';
import CourseLandingPage from '@/components/landingPage/CourseLandingPage';

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden font-Montserrat">
      <NavBar />

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 p-5 mb-10 xl:mx-12 lg:mx-2 md:flex-col lg:flex-row">
        <div className="mx-auto leading-none lg:w-3/5 font-Montserrat lg:ml-0 xl:ml-0">
          <div className="flex gap-5 mb-2">
            <h1 className="text-orange-05 md:text-[60px] lg:text-[60px] xl:text-[60px] text-[40px] max-[376px]:text-[37px] font-bold">
              Preducation
            </h1>
            <h1 className="md:text-[70px] text-[36px] font-semibold text-orange-05 xl:text-[70px] max-[380px]:text-[27px]">
              + + +
            </h1>
            <br />
          </div>
          <div>
            <h1 className="md:text-[52px] text-[30px] font-semibold text-primary-dark-blue mb-4 dark:text-dark-grey-02">
              Dari Praktisi Terbaik!
            </h1>
          </div>
          <div>
            <p className="mt-1 leading-loose text-[14px] md:text-[20px] md:w-5/6 lg:w-4/5 dark:text-dark-grey-02">
              Mari bersama-sama menjelajahi dunia pembelajaran yang menyenangkan dan menginspirasi. Bergabunglah hari
              ini dan mulailah menggapai sukses!
            </p>
          </div>
          {/* BUTTON BERGABUNG */}
          <button className="bergabungBtn bg-orange-05 p-5 hover:scale-95 text-white rounded-[10px] mt-2 font-bold">
            Bergabung Sekarang
          </button>
        </div>

        <div className="mx-auto">
          <Image
            src="/object.svg"
            width={500}
            height={500}
            alt="gambar w-full w-auto md:mx-auto h-auto object-contain flex-shrink-0"
            priority={true}
          />
        </div>
      </div>

      <CourseLandingPage />

      {/* ULASAN */}
      <div className="text-center md:mb-5]">
        <h1 className="text-orange-05 md:text-[44px] text-[24px]  font-semibold">Ulasan</h1>
        <p className="md:text-[24px] dark:text-dark-grey-02">Pengalaman Belajar Alumni</p>
      </div>
      <Carousel />

      {/* DAPATKAN APLIKASI DI GOOGLEPLAY */}
      <div className="flex p-3 mt-10 mb-8">
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
                  className="float-right w-[200px] h-[200px]"
                />
              </a>
            </div>
          </div>

          <Image
            src="/jjj.png"
            height={200}
            width={200}
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
