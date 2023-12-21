'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { IoMenu, IoClose } from 'react-icons/io5';

const NavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Mengubah style body saat isMenuOpen berubah
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen && <div className="fixed top-0 left-0 z-20 w-full h-full bg-black opacity-80" />}

      <nav
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
              ? 'md:static absolute bg-primary-dark-blue  min-h-[30vh] md:min-h-fit w-[95%] left-3 top-[-100%] flex items-center px-5'
              : 'md:static absolute bg-primary-dark-blue pb-10 pt-24 min-h-[100vh] z-50 md:min-h-fit w-[50%] right-0 top-0 flex items-start px-5'
          }`}
        >
          <ul className="flex md:items-center md:gap-[4vw] gap-8 md:flex-row flex-col text-white mx-auto text-center">
            <IoClose
              className={`${isMenuOpen ? 'absolute top-[20px] right-5 text-2xl active:scale-110' : 'hidden'}`}
              onClick={toggleMenu}
            />
            <li>
              <a
                href="#"
                className="font-bold"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-bold"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-bold"
              >
                Kursus
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-bold"
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-white">Masuk</button>
          <button className="bg-orange-05 text-white px-5 py-2 rounded-[10px]">Daftar</button>
          <IoMenu
            color="white"
            size={40}
            className="cursor-pointer menuBtn md:hidden"
            onClick={toggleMenu}
             data-testid="menu-button"
          />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
