import React from "react";
import Image from "next/image";
import NavBar from "@/components/navbar/NavBarlp";
import Footer from "@/components/footer/Footer";

import { FaStar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";
import Carousel from "@/components/carousel/Carousel";

const LandingPage = () => {
  return (
    <div className="">
      <NavBar />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row mb-10 p-5 gap-5 sm:mt-[100px]">
        {/* KIRI */}
        <div className="leading-none font-Montserrat">
          {/* KIRI */}
          <div className="flex gap-5">
            <h1 className="text-orange-05 md:text-[90px] text-[36px] font-extrabold font-Montserrat">
              Preducation
            </h1>
            <Image src="/Group.svg" height={100} width={200} alt="" />
            <br />
          </div>
          <div>
            <h1 className="md:text-[70px] text-[32px] font-black text-primary-dark-blue">
              Dari Praktisi Terbaik!
            </h1>
          </div>
          <div>
            <p className="mt-1 leading-loose text-[10px] md:text-[20px]">
              Mari bersama-sama menjelajahi dunia pembelajaran yang menyenangkan{" "}
              <br /> dan menginspirasi. Bergabunglah hari ini dan mulailah
              menggapai sukses!
            </p>
          </div>
          {/* BUTTON BERGABUNG */}
          <button className="bergabungBtn bg-orange-05 p-5 text-white rounded-[10px] mt-2 font-bold">
            Bergabung Sekarang
          </button>
        </div>

        {/* KANAN */}
        <div>
          {/* GAMBAR */}
          <div className="relative sm:mt-[-40px]">
            <Image
              src="object.svg"
              width={700}
              height={700}
              alt=" "
              className="gambar w-full w-auto h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="justify-center place-content-center">
        <div className="relative mx-auto bg-primary-dark-blue w-[300px] md:w-[500px] rounded-[15px] h-[60px] px-5 py-4  flex mb-10 justify-between">
          <div className="flex gap-2">
            {/* ICON */}
            <Image
              src="search.svg"
              width={20}
              height={20}
              alt=""
              className="md:w-[20px] w-[15px]"
            />
            <p className="text-white text-[10px] md:text-[16px] mt-2 md:mt-0 leading-loose">
              Temukan Kursus...
            </p>
          </div>

          <button className=" text-white bg-orange-05 rounded-[10px] absolute  px-7 py-2 top-[14px] right-3 text-[10px] md:text-[14px] md:top-[10px]">
            Cari
          </button>
        </div>
      </div>

      {/* KURSUS POPULER */}
      <div>
        <div className="text-center">
          <h1 className="text-orange-05 md:text-[36px] text-[24px] font-semibold">
            Kursus Populer
          </h1>
          <p>
            Belajar Menyediakan berbagai macam kelas yang sudah berbasis
            industri untuk <br /> meningkatkan keterampilan digital kamu.
          </p>
        </div>

        {/* KOTAK KURSUS POPULER */}
        <div>
          <div className="flex  md:ml-[100px] mx-auto flex-wrap md:flex-row flex-col content-start md:gap-5 gap-10 flex-shrink-0 px-5 mb-[100px] mt-10 ">
            {/* UI/UX DESIGN */}
            <div className="relative">
              <div className=" relative container flex flex-col bg-primary-dark-blue md:w-[290px] md:h-[326px] rounded-[15px] md:p-5 p-10 pb-8  z-10 mx-auto">
                {/* GAMBAR */}
                <Image
                  src="image 2.svg"
                  width={263}
                  height={153}
                  alt=""
                  className="mx-auto"
                />
                {/* CONTENT */}
                <div className="flex justify-between mt-2">
                  {/* TITLE */}
                  <h1 className="text-white">UI/UX Design</h1>
                  {/* BINTANG */}
                  <div className="bintang flex">
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-mati" />
                  </div>
                </div>
                {/* HARGA */}
                <div className="harga text-white text-2xl">Rp. 149.000</div>
                <hr className="border-dotted border-[1px] mt-1 mb-2" />
                {/* WAKTU COURSE MODUL */}
                <div className="flex gap-2">
                  {/* WAKTU */}
                  <div className="flex gap-1">
                    <IoTimeOutline color="white" />
                    <p className="text-white text-[10px]">22hr 30min</p>
                  </div>
                  {/* COURSES */}
                  <div className="flex gap-1">
                    <GoDeviceCameraVideo color="white" />
                    <p className="text-white text-[10px]">34 Courses</p>
                  </div>
                  {/* MODUL */}
                  <div className="flex gap-1">
                    <Image
                      src="modul.svg"
                      width={10}
                      height={10}
                      alt="folder"
                    />
                    <p className="text-white text-[10px]">10 Modul</p>
                  </div>
                </div>
              </div>
              {/* BUTTON */}
              <button className="absolute font-bold bg-orange-05 py-4 px-16 top-[290px]  md:top-[300px] text-white rounded-[10px] z-30 md:left-14  left-20">
                Daftar
              </button>
            </div>

            {/* WEB DEV */}
            <div className="relative">
              <div className=" relative container flex flex-col bg-primary-dark-blue md:w-[290px] md:h-[326px] rounded-[15px] md:p-5 p-5 pb-8  z-10 mx-auto">
                {/* GAMBAR */}
                <Image
                  src="image 3.svg"
                  width={263}
                  height={153}
                  alt=""
                  className="mx-auto"
                />
                {/* CONTENT */}
                <div className="flex justify-between mt-2">
                  {/* TITLE */}
                  <h1 className="text-white">UI/UX Design</h1>
                  {/* BINTANG */}
                  <div className="bintang flex">
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-mati" />
                  </div>
                </div>
                {/* HARGA */}
                <div className="harga text-white text-2xl">Rp. 149.000</div>
                <hr className="border-dotted border-[1px] mt-1 mb-2" />
                {/* WAKTU COURSE MODUL */}
                <div className="flex gap-2">
                  {/* WAKTU */}
                  <div className="flex gap-1">
                    <IoTimeOutline color="white" />
                    <p className="text-white text-[10px]">22hr 30min</p>
                  </div>
                  {/* COURSES */}
                  <div className="flex gap-1">
                    <GoDeviceCameraVideo color="white" />
                    <p className="text-white text-[10px]">34 Courses</p>
                  </div>
                  {/* MODUL */}
                  <div className="flex gap-1">
                    <Image
                      src="modul.svg"
                      width={10}
                      height={10}
                      alt="folder"
                    />
                    <p className="text-white text-[10px]">10 Modul</p>
                  </div>
                </div>
              </div>
              {/* BUTTON */}
              <button className="absolute font-bold bg-orange-05 py-4 px-16 top-[275px] md:top-[300px] text-white rounded-[10px] z-30 md:left-14 left-20">
                Daftar
              </button>
            </div>

            {/* ANDROID DEV */}
            <div className="relative">
              <div className=" relative container flex flex-col bg-primary-dark-blue md:w-[290px] md:h-[326px] rounded-[15px] md:p-5 p-5 pb-8  z-10 mx-auto">
                {/* GAMBAR */}
                <Image
                  src="image 4.svg"
                  width={263}
                  height={153}
                  alt=""
                  className="mx-auto"
                />
                {/* CONTENT */}
                <div className="flex justify-between mt-2">
                  {/* TITLE */}
                  <h1 className="text-white">UI/UX Design</h1>
                  {/* BINTANG */}
                  <div className="bintang flex">
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-mati" />
                  </div>
                </div>
                {/* HARGA */}
                <div className="harga text-white text-2xl">Rp. 149.000</div>
                <hr className="border-dotted border-[1px] mt-1 mb-2" />
                {/* WAKTU COURSE MODUL */}
                <div className="flex gap-2">
                  {/* WAKTU */}
                  <div className="flex gap-1">
                    <IoTimeOutline color="white" />
                    <p className="text-white text-[10px]">22hr 30min</p>
                  </div>
                  {/* COURSES */}
                  <div className="flex gap-1">
                    <GoDeviceCameraVideo color="white" />
                    <p className="text-white text-[10px]">34 Courses</p>
                  </div>
                  {/* MODUL */}
                  <div className="flex gap-1">
                    <Image
                      src="modul.svg"
                      width={10}
                      height={10}
                      alt="folder"
                    />
                    <p className="text-white text-[10px]">10 Modul</p>
                  </div>
                </div>
              </div>
              {/* BUTTON */}
              <button className="absolute font-bold bg-orange-05 py-4 px-16 top-[275px] md:top-[300px] text-white rounded-[10px] z-30 md:left-14 left-20">
                Daftar
              </button>
            </div>

            {/* DATA SCIENCE */}
            <div className="relative">
              <div className=" relative container flex flex-col bg-primary-dark-blue md:w-[290px] md:h-[326px] rounded-[15px] md:p-5 p-5 pb-8  z-10 mx-auto">
                {/* GAMBAR */}
                <Image
                  src="image 5.svg"
                  width={263}
                  height={153}
                  alt=""
                  className="mx-auto"
                />
                {/* CONTENT */}
                <div className="flex justify-between mt-2">
                  {/* TITLE */}
                  <h1 className="text-white">UI/UX Design</h1>
                  {/* BINTANG */}
                  <div className="bintang flex">
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-hidup" />
                    <FaStar className="text-bintang-mati" />
                  </div>
                </div>
                {/* HARGA */}
                <div className="harga text-white text-2xl">Rp. 149.000</div>
                <hr className="border-dotted border-[1px] mt-1 mb-2" />
                {/* WAKTU COURSE MODUL */}
                <div className="flex gap-2">
                  {/* WAKTU */}
                  <div className="flex gap-1">
                    <IoTimeOutline color="white" />
                    <p className="text-white text-[10px]">22hr 30min</p>
                  </div>
                  {/* COURSES */}
                  <div className="flex gap-1">
                    <GoDeviceCameraVideo color="white" />
                    <p className="text-white text-[10px]">34 Courses</p>
                  </div>
                  {/* MODUL */}
                  <div className="flex gap-1">
                    <Image
                      src="modul.svg"
                      width={10}
                      height={10}
                      alt="folder"
                    />
                    <p className="text-white text-[10px]">10 Modul</p>
                  </div>
                </div>
              </div>
              {/* BUTTON */}
              <button className="absolute font-bold bg-orange-05 py-4 px-16 top-[275px] md:top-[300px] text-white rounded-[10px] z-30 md:left-14 left-20">
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ULASAN */}
      <div className="text-center">
        <h1 className="text-orange-05 md:text-[36px] text-[24px] font-semibold">
          Ulasan
        </h1>
        <p>Pengalaman Belajar Alumni</p>
      </div>
      <Carousel />

      {/* DAPATKAN APLIKASI DI GOOGLEPLAY */}
      <div className="flex p-3">
        <div className="flex mx-auto">
          <div className="flex flex-col mx-auto relative p-5 mt-[50px]">
            <h1 className="font-bold text-orange-05 md:text-[36px] ">
              Dapatkan Aplikasi Kami Di
            </h1>
            <div>
              <a href="#">
                <Image
                  src="googlePlay.svg"
                  width={200}
                  height={200}
                  alt="gambar google play"
                  className="float-right"
                />
              </a>
            </div>
          </div>
          <div className="">
            <Image src="hp.svg" height={200} width={200} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
