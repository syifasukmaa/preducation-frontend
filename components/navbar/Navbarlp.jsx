'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { IoMenu } from 'react-icons/io5'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className="flex justify-between bg-primary-dark-blue p-5 items-center w-[95%] mx-auto rounded-[10px] mt-5">
      <div>
        <Image src="/preducationLogo.svg" width={70} height={70} alt="preducationLogo" />
      </div>
      <div
        className={`${
          !isMenuOpen
            ? 'md:static absolute bg-primary-dark-blue  min-h-[30vh] md:min-h-fit w-[95%] left-3 top-[-100%] flex items-center px-5'
            : 'md:static absolute bg-primary-dark-blue  min-h-[30vh] md:min-h-fit w-[95%] left-3 top-[12%] flex items-center px-5'
        }`}
        data-testid="subnav-container"
      >
        <ul className="flex md:items-center md:gap-[4vw] gap-8 md:flex-row flex-col text-white mx-auto text-center">
          <li>
            <Link className="font-bold" href="#">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="#" className="font-bold">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href="#" className="font-bold">
              Kursus
            </Link>
          </li>
          <li>
            <Link href="#" className="font-bold">
              Kontak
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-6 items-center">
        <button className="text-white">Masuk</button>
        <button className="bg-orange-05 text-white px-5 py-2 rounded-[10px]">Daftar</button>

        <IoMenu
          color="white"
          size={40}
          className="menuBtn cursor-pointer md:hidden"
          onClick={toggleMenu}
          data-testid="menu-button"
        />
      </div>
    </nav>
  )
}

export default NavBar
