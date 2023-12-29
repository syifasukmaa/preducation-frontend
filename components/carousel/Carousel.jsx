'use client'
import { useState } from 'react'
import Image from 'next/image'

import { PiArrowCircleLeft } from 'react-icons/pi'
import { PiArrowCircleRight } from 'react-icons/pi'
import { motion } from 'framer-motion'
import { navVariants, slideIn } from '../../utils/motion'

const Carousel = () => {
  const [page, setPage] = useState(1)

  const handlePrevPage = () => {
    setPage((prev) => (prev - 1 <= 0 ? 1 : prev - 1))
  }

  const handleNextPage = () => {
    setPage((prev) => (prev + 1 >= 2 ? 2 : prev + 1))
  }

  const review = {
    gambar: ['null', 'PPL 1.svg', 'PPl 1.svg'],

    text: [
      'null',
      '“Pembelajaran yang fleksibel dan mudah diakses. Saya bisa belajar kapan pun saya mau. Materi yang diajarkan sangat relevan dengan kebutuhan industri. Saya merasa lebih siap untuk menghadapi tantangan di tempat kerja setelah menyelesaikan kursus ini.”',
      '“Mulai dari dasar-dasar HTML, CSS, dan JavaScript, hingga pemrograman server dan pengelolaan database, kursus disini memberikan pemahaman menyeluruh tentang teknologi yang diperlukan untuk menjadi pengembang web lengkap.”',
    ],
    nama: ['null', 'Margot Robbie', 'Scarlett Johansson'],
  }

  return (
    <div className="flex md:mt-[600px] xl:mt-[200px] mt-5 px-5 gap-5 md:flex-col flex-col xl:flex-row flex-grow-0 flex-shrink-0">
      <motion.div
        variants={slideIn('left', 'tween', 0.5, 1.5)}
        initial="hidden"
        whileInView="show"
        className="items-start relative mx-auto bg-primary-dark-blue md:w-[500px] w-[300px] md:h-auto h-[300px] rounded-[15px] flex-shrink-0 flex-grow-0"
      >
        <div className="absolute bottom-0 mx-auto bg-primary-dark-blue md:w-[500px] w-[300px] md:h-auto h-[300px] rounded-[15px]">
          <Image
            src={review.gambar[page]}
            width={400}
            height={10}
            alt="image"
            className="mx-auto ml-10 xl:w-[390px] w-[200px] md:w-[380px]"
          />
        </div>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.5, 1.5)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col flex-wrap gap-5 p-10 md:mx-auto"
      >
        <p className="text-justify md:w-[500px] md:text-[20px] xl:text-[26px] flex-shrink-0 dark:text-dark-grey-02">
          {review.text[page]}
        </p>

        <h2 className="text-ORANGE font-bold text-[20px] dark:text-dark-grey-02">{review.nama[page]}</h2>
        <div className="flex gap-5">
          <button onClick={handlePrevPage}>
            <PiArrowCircleLeft size={50} className="dark:text-dark-grey-05 hover:scale-95" />
          </button>
          <button onClick={handleNextPage}>
            <PiArrowCircleRight size={50} className="dark:text-dark-grey-05 hover:scale-95" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Carousel
