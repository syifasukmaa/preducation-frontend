'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { slideIn } from '@/utils/motion'
import Image from 'next/image'

const Home = () => {
  return (
    <div id="home" className="flex flex-col justify-between gap-5 p-5 mb-10 xl:mx-12 lg:mx-2 md:flex-col lg:flex-row">
      <motion.div
        variants={slideIn('left', 'tween', 0.5, 1.5)}
        initial="hidden"
        whileInView="show"
        className="mx-auto leading-none lg:w-3/5 font-Montserrat lg:ml-0 xl:ml-0"
      >
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
            Mari bersama-sama menjelajahi dunia pembelajaran yang menyenangkan dan menginspirasi. Bergabunglah hari ini
            dan mulailah menggapai sukses!
          </p>
        </div>
        <button className="bergabungBtn bg-orange-05 p-5 hover:scale-95 text-white rounded-[10px] mt-2 font-bold">
          Bergabung Sekarang
        </button>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.5, 1.5)}
        initial="hidden"
        whileInView="show"
        className="mx-auto"
      >
        <Image
          src="/object.svg"
          width={500}
          height={500}
          alt="gambar w-full w-auto md:mx-auto h-auto object-contain flex-shrink-0"
          priority={true}
        />
      </motion.div>
    </div>
  )
}

export default Home
