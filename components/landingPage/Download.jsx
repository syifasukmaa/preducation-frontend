'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { slideIn } from '@/utils/motion'
import Image from 'next/image'

const Download = () => {
  return (
    <div id="download" className="flex p-3 mt-10 mb-8">
      <div className="flex mx-auto">
        <motion.div
          variants={slideIn('left', 'tween', 0.5, 1.5)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col mx-auto relative p-5 mt-[50px]"
        >
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
        </motion.div>
        <motion.div variants={slideIn('right', 'tween', 0.5, 1.5)} initial="hidden" whileInView="show">
          <Image src="/jjj.png" height={200} width={200} alt="" />
        </motion.div>
      </div>
    </div>
  )
}

export default Download
