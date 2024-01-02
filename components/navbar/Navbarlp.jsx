'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'
import DarkModeButton from '../button/DarkModeButton'
import { motion } from 'framer-motion'
import { navVariants } from '../../utils/motion'
import { Link } from 'react-scroll'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {isMenuOpen && <div className="fixed top-0 left-0 z-20 w-full h-full bg-black opacity-80" />}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${'flex justify-between bg-primary-dark-blue p-5 items-center w-[95%] mx-auto rounded-[10px] mt-5'}`}
      >
        <div>
          <Image
            src="/preducationLogo.svg"
            width={70}
            height={70}
            alt="preducationLogo"
            className="w-[70px] h-[70px]"
          />
        </div>
        <div
          data-testid="subnav-container"
          className={`${
            !isMenuOpen
              ? 'lg:static absolute bg-primary-dark-blue  min-h-[30vh] md:min-h-fit w-[95%] left-3 top-[-100%] flex items-center px-5'
              : 'lg:static fixed bg-primary-dark-blue pb-10 pt-24 min-h-[100vh] z-50 lg:min-h-fit w-[50%] right-0 top-0 flex items-start px-5'
          }`}
        >
          <ul className="flex lg:items-center lg:gap-[4vw] gap-8 lg:flex-row flex-col text-dark-grey-02 mx-auto text-center">
            <IoClose
              className={`${isMenuOpen ? 'absolute top-[20px] right-5 text-2xl active:scale-110' : 'hidden'}`}
              onClick={toggleMenu}
            />
            <li>
              <Link spy={true} smooth={true} offset={-50} duration={500} to="home" className="cursor-pointer font-bold">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                to="course"
                className="cursor-pointer font-bold"
              >
                Kursus
              </Link>
            </li>
            <li>
              <Link
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                to="review"
                className="cursor-pointer font-bold"
              >
                Ulasan
              </Link>
            </li>

            <li>
              <Link
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                to="download"
                className="cursor-pointer font-bold"
              >
                Download
              </Link>
            </li>
            <li className="text-2xl md:hidden">
              <DarkModeButton />
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-orange-05 text-white px-5 py-2 rounded-[10px] hover:scale-95">Download</button>
          <div className="flex-col items-center justify-center hidden px-1 py-1 text-2xl rounded-lg dark:bg-orange-06 text-dark-grey-02 md:flex disp md:py-2 md:px-3 bg-orange-05 hover:scale-95">
            <DarkModeButton />
          </div>
          <IoMenu
            color="white"
            size={40}
            className="cursor-pointer menuBtn lg:hidden"
            onClick={toggleMenu}
            data-testid="menu-button"
          />
        </div>
      </motion.nav>
    </>
  )
}

export default NavBar
