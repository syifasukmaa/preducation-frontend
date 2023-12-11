'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { PiEye } from 'react-icons/pi'
import { PiEyeSlash } from 'react-icons/pi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { resetPassword } from '@/utils/fetch'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ResetPass = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState({
    password: '',
    showPass: false,
  })
  const [confirmPassword, setConfirmPassword] = useState({
    password: '',
    showPass: false,
  })

  const searchParams = useSearchParams()
  const resetPasswordToken = searchParams.get('token')

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await resetPassword(resetPasswordToken, password.password, confirmPassword.password)

      const data = await response.json()

      if (response.ok) {
        toast.success('Anda berhasil mengubah password', {
          position: toast.POSITION.TOP_CENTER,
        })
        setPassword({ ...password, password: '' })
        setConfirmPassword({ ...confirmPassword, password: '' })
      } else if (data.message === 'Password reset token already expired') {
        toast.error('Tautan invalid atau kedaluwarsa', {
          position: toast.POSITION.TOP_CENTER,
        })
      } else if (data.message === 'Minimum password 8 characters') {
        toast.error('Password min 8 karakter', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const handlePass = (event) => {
    setPassword({ ...password, password: event.target.value })
  }
  const handlePass2 = (event) => {
    setConfirmPassword({ ...confirmPassword, password: event.target.value })
  }

  const toggleVisibility1 = () => {
    setPassword({ ...password, showPass: !password.showPass })
  }
  const toggleVisibility2 = () => {
    setConfirmPassword({ ...confirmPassword, showPass: !confirmPassword.showPass })
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="p-8 lg:p-16 lg:w-2/3 flex items-center justify-center">
        <div className="w-full lg:w-2/3">
          <h1 className="font-bold text-2xl text-primary-dark-blue  mb-8 lg:mb-12 text-left">Reset Password</h1>

          <div className="mt-2 relative block mb-4 lg:mb-8">
            <br />
            <p className="float-left">Masukkan Password Baru</p>

            <br />
            <input
              type={password.showPass ? 'text' : 'password'}
              name="password"
              id="passInput"
              placeholder="Password"
              className={`${
                password.password !== confirmPassword.password ? 'border-red-500' : ''
              } float-left border-2 rounded-lg w-full p-2 outline-none`}
              value={password.password}
              onChange={handlePass}
              required
            />

            <button className="absolute right-4 top-14" onClick={toggleVisibility1}>
              {!password.showPass ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
            </button>
          </div>

          <div className="mt-2 relative block mb-4 lg:mb-8">
            <br />
            <p className="float-left">Ulangi Password Baru</p>
            <br />
            <input
              type={confirmPassword.showPass ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassInput"
              placeholder="Konfirmasi password"
              className={`${
                password.password !== confirmPassword.password ? 'border-red-500' : ''
              } float-left border-2 rounded-lg w-full p-2 outline-none`}
              value={confirmPassword.password}
              onChange={handlePass2}
              required
            />
            <button className="absolute right-4 top-14" onClick={toggleVisibility2}>
              {!confirmPassword.showPass ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
            </button>
          </div>
          <br />
          <br />

          <button
            disabled={
              isLoading ||
              password.password !== confirmPassword.password ||
              password.password.length === 0 ||
              confirmPassword.password.length === 0
                ? true
                : false
            }
            className={`${
              isLoading ||
              password.password !== confirmPassword.password ||
              password.password.length === 0 ||
              confirmPassword.password.length === 0
                ? 'cursor-not-allowed'
                : ''
            } text-white bg-orange-05 rounded-xl w-full h-10  mb-10 flex items-center justify-center`}
            onClick={handleSubmit}
          >
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" size={20} /> : 'Ganti'}
          </button>
          <br />
          <div className="tempatAlert fixed bottom-6 lg:bottom-2 lg:left-[33%] left-1/2  transform -translate-x-1/2 flex justify-center items-center w-full lg:w-auto sm:bottom-2"></div>
        </div>
      </div>

      <div className="bg-primary-dark-blue p-8 lg:p-16 lg:w-1/3 flex items-center justify-center">
        <Image src="/img/iconPreducation.png" alt="logo" width={150} height={150} className="mx-auto" priority />
      </div>
      <ToastContainer className={'z-50'} />
    </div>
  )
}

export default ResetPass
