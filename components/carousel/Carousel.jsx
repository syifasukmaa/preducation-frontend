'use client'
import {  useState } from "react"
import Image from "next/image"

const Carousel = () => {
    const [page, setPage] = useState(1)

    const handlePrevPage = ()=>{
      setPage(prev => ((prev-1) <=0 ? 1:prev-1))
    }

    const handleNextPage = ()=>{
      setPage(prev => ((prev+1) >= 2 ? 2:prev+1))
    }

    const review = {
      gambar:[
        'null',
        'PPL 1.svg',
        'PPl 1.svg',

      ],

      text :['null',
      '“Pembelajaran yang fleksibel dan mudah diakses. Saya bisa belajar kapan pun saya mau. Materi yang diajarkan sangat relevan dengan kebutuhan industri saat ini. Saya merasa lebih siap untuk menghadapi tantangan di tempat kerja setelah menyelesaikan kursus ini.”',
      ' Mulai dari dasar-dasar HTML, CSS, dan JavaScript untuk sisi depan, hingga pemrograman server dan pengelolaan database untuk sisi belakang, kursus ini memberikan pemahaman menyeluruh tentang teknologi yang diperlukan untuk menjadi pengembang web lengkap.'
    
    ],
    nama:[
      'null',
      'Syifa Sukma Ramadhani',
      'John Doe',

    ]
    }
    
  return (
    <div className='flex md:mt-[100px] mt-[150px] px-5 gap-5 md:flex-row flex-col flex-grow-0 flex-shrink-0'>
        {/* GAMBAR */}
          <div className=' items-start relative mx-auto bg-NAVY md:w-[500px] w-[300px] rounded-[15px] flex-shrink-0 flex-grow-0'>
            <Image
              src='frame.svg'
              width={500}
              height={10}
              alt=''
              />
            <div className="absolute bottom-0">
              <Image
                src={review.gambar[page]}
                width={400}
                height={10}
                alt=''/>
            </div>
              
          </div>
        {/* TESTIMONI */}
        <div className='flex flex-col p-10 gap-5 flex-wrap '>
            <p className='text-justify md:w-[500px] md:text-[24px]'>
              {review.text[page]}
            </p>

            <h2 className='text-ORANGE font-bold text-[20px]'>{review.nama[page]}</h2>
            {/* ARROW */}
            <div className='flex gap-5'>
              {/* PANAH KIRI */}
              <button onClick={handlePrevPage}>
              <Image
                src='left.svg'
                width={50}
                height={50}
                alt=''/>
              </button>

              {/* PANAH KANAN */}
              <button onClick={handleNextPage}>
              <Image
                src='right.svg'
                width={50}
                height={50}
                alt=''/>
              </button>
            </div>
        </div>
      </div>
  )
}

export default Carousel