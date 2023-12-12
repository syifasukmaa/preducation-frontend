import React from 'react'
import Image from 'next/image'

const NavBarlp = () => {
  return (
    <nav className=' p-5'>
        <div className='flex bg-primary-dark-blue rounded-[14px] px-5  justify-between'>
            {/* LOGO */}
                <div className='flex object-contain'>
                <Image
                    src='/preducationLogo.svg'
                    width={50}
                    height={50}
                    alt='logo'
                    className='object-contain w-[100px] p-5'/>
                </div>
                 {/* NAVIGASI */}
                 <div className=' hidden md:flex md:gap-[75px] md:mt-9 gap-5 text-white'>
                        <a href="#">Beranda</a>
                        <a href="#">Tentang Kami</a>
                        <a href="#">Kursus</a>
                        <a href="#">Kontak</a>
                    </div>
                        
            

            {/* MASUK / DAFTAR */}
            <div className='flex gap-7 mt-7 '>
                {/* MASUK */}
                <div>
                    <button className='masukBtn text-white font-bold mt-2'>Masuk</button>
                </div>
                {/* DAFTAR */}
                <div>
                    <button className='daftarBtn text-white w-auto object-contain  rounded-xl bg-orange-05 px-5 py-2 font-bold'>Daftar</button>
                </div>
            </div>
        </div>
        {/* NAVIGASI */}
        <div className=' md:hidden flex md:gap-[75px] md:mt-9 mt-1 gap-5 text-white bg-primary-dark-blue p-2 rounded-[10px]'>
            <a href="#">Beranda</a>
            <a href="#">Tentang Kami</a>
            <a href="#">Kursus</a>
            <a href="#">Kontak</a>
        </div>
    </nav>
  )
}

export default NavBarlp