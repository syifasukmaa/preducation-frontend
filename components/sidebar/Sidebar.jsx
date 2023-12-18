'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu'
import { SiGoogleclassroom } from 'react-icons/si'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Swal from 'sweetalert2'


export default function Sidebar() {
  const url = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const sidebarItems = [
    { id: '/admin/dashboard', icon: <LuLayoutDashboard />, label: 'Dashboard' },
    {
      id: '/admin/course',
      icon: <SiGoogleclassroom />,
      label: 'Kelola Kelas',
    },
  ]

  const handleClick = (itemId) => {
    router.push(itemId)
  }

  const handleLogOut = () => {
    Swal.fire({
      title: 'Apakah yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#167F71',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Keluar',
      cancelButtonText: 'Batal',
      customClass: {
        title: 'custom-title-class',
        content: 'custom-text-class',
        popup: 'custom-card-class',
        cancelButton: 'custom-button-cancel',
        confirmButton: 'custom-button-confirm',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        signOut()
      }
    })
  }

  return (
    <aside
      className={`bg-primary-dark-blue text-white w-60 md:w-3/12 lg:w-[15%]
      transition-all duration-300 ease-in-out  ${open ? 'translate-x-0' : '-translate-x-3/4 md:translate-x-0'}
      overflow-y-auto z-50 shadow-lg fixed top-0 left-0 bottom-0 md:pt-0 `}
    >
      <button
        onClick={toggleSidebar}
        title="hamburger-button"
        className="fixed z-50 px-3 py-2 text-white rounded md:hidden right-4 top-14 bg-orange-05"
      >
        {open ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>

      <Image
        src="/img/iconPreducation.png"
        // className={`overflow-hidden transition-all w-[65%] ml-5 md:m-auto ${open ? 'w-32' : 'w-0'}`}
        className={`md:m-auto`}
        alt="Icon Belajar"
        width={110}
        height={110}
        priority
      />

      <nav className="py-2 mt-6 md:mt-3">
        <ul className={`${open ? '' : 'flex flex-col justify-end items-end pr-3 md:pr-0 md:block'}`}>
          {sidebarItems?.map((item, index) => (
            <li
              key={index}
              className={` text-white py-3 ${url.startsWith(item.id) ? 'bg-orange-05' : ''}`}

            >
              <button
                href={item.id}
                className={`flex items-center px-4 ${url.startsWith(item.id) ? 'ml-4' : ''}`}
                onClick={() => handleClick(item.id)}
              data-testid={item.label}
                
              >
                <span>{item.icon}</span>
                <span className={`ml-3 ${open ? 'block' : 'hidden md:block'} font-bold`}>{item.label}</span>
              </button>
            </li>
          ))}

          <li className={`text-white py-3 bg-orange-05} active:bg-orange-05`}>
            <button
              className={`flex items-center px-4`}
              onClick={handleLogOut}
              data-testid="handle-logout"
            >
              <span>
                <LuLogOut />
              </span>
              <span className={`ml-3 ${open ? 'block' : 'hidden md:block'} font-bold`}>Keluar</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
