import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { navVariants, slideIn } from '../../utils/motion'

const Footer = () => {
  return (
    <motion.footer variants={slideIn('down', 'tween', 0.5, 1)} initial="hidden" whileInView="show">
      <div className="flex justify-between gap-5 flex-col md:flex-row bg-primary-dark-blue p-10 text-center md:text-left">
        {/* KONTAK KAMI */}
        <div className="flex flex-col gap-2 ">
          <h2 className="font-bold text-white">Kontak Kami</h2>

          <div className="flex gap-2 mx-auto md:mx-0 ">
            {/* icon */}
            <Image src="/location.svg" width={10} height={10} alt="location" />
            <p href="#" className="text-white">
              Jakarta
            </p>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            {/* icon */}
            <Image src="/phone.svg" width={10} height={10} alt="phone" />
            <p href="#" className="text-white">
              (000) 123-456
            </p>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            {/* icon */}
            <Image src="/email.svg" width={10} height={10} alt="email" />
            <p href="#" className="text-white">
              preducation@example.com
            </p>
          </div>
        </div>

        {/* PREDUCATION */}
        <div className="flex flex-col gap-2 ">
          <h2 className="font-bold text-white">Preducation</h2>

          <div className="flex gap-2 mx-auto md:mx-0 ">
            <a href="#" className="text-white cursor-pointer">
              Tentang kelas
            </a>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            <a href="#" className="text-white cursor-pointer">
              Karir
            </a>
          </div>
        </div>

        {/* LAYANAN */}
        <div className="flex flex-col gap-2 ">
          <h2 className="font-bold text-white">Layanan</h2>

          <div className="flex gap-2 mx-auto md:mx-0 ">
            <Link href="#" className="text-white cursor-pointer">
              Kursus
            </Link>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            <Link href="#" className="text-white cursor-pointer">
              Kursus Populer
            </Link>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            <Link href="#" className="text-white cursor-pointer">
              Program
            </Link>
          </div>
        </div>

        {/* BANTUAN */}
        <div className="flex flex-col gap-2 ">
          <h2 className="font-bold text-white">Bantuan</h2>

          <div className="flex gap-2 mx-auto md:mx-0 ">
            <Link href="#" className="text-white cursor-pointer">
              FAQ
            </Link>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            <Link href="#" className="text-white cursor-pointer">
              Kebijakan Privasi
            </Link>
          </div>

          <div className="flex gap-2 mx-auto md:mx-0">
            <Link href="#" className="text-white cursor-pointer">
              Forum
            </Link>
          </div>
          <div className="flex gap-2 mx-auto md:mx-0">
            <Link href="#" className="text-white cursor-pointer">
              Syarat dan Ketentuan
            </Link>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex flex-col gap-2 ">
          <h2 className="font-bold text-white">Social Media</h2>

          <div className=" flex flex-row mx-auto gap-5 ">
            <Link href="#">
              <Image src="/linkedIn.svg" width={20} height={20} alt="linkedin" />
            </Link>
            <Link href="#">
              <Image src="/twitter.svg" width={20} height={20} alt="twitter" />
            </Link>
            <Link href="#">
              <Image src="/instagram.svg" width={20} height={20} alt="instagram" />
            </Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="h-auto bg-black place-content-center p-10">
        <div className="mx-auto">
          <p className="text-white text-center opacity-[.7]">Copyright 2023 | All Rights Reserved</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
