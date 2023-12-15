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
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visibilityPassword, setVisibilityPassword] = useState(false)
  const [visibilityConfPassword, setVisibilityConfPassword] = useState(false)

  const searchParams = useSearchParams()
  const resetPasswordToken = searchParams.get('token')

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await resetPassword(resetPasswordToken, password, confirmPassword)

      const data = await response.json()

      if (response.ok) {
        toast.success('Anda berhasil mengubah password', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setPassword('')
        setConfirmPassword('')
        setIsLoading(false)
      } else if (data.message === 'Password reset token already expired') {
        toast.error('Tautan invalid atau kedaluwarsa', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setIsLoading(false)
      } else if (data.message === 'Minimum password 8 characters') {
        toast.error('Password min 8 karakter', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setIsLoading(false)
      } else {
        toast.error('Terjadi Kesalahan', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setIsLoading(false)
      }
    } catch (err) {
      toast.error('Internal Server Error', {
        position: toast.POSITION.TOP_RIGHT,
      })
      setIsLoading(false)
      throw new Error('Internal server error')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="p-8 lg:p-16 lg:w-2/3 flex items-center justify-center">
        <div className="w-full lg:w-2/3">
          <h1 className="font-bold text-2xl text-primary-dark-blue  mb-8 lg:mb-12 text-left">Reset Password</h1>
          <div className="mt-2 block lg:mb-4">
            <br />
            <label htmlFor="passInput">Masukkan Password Baru</label>

            <br />
            <div className="relative">
              <input
                type={visibilityPassword ? 'text' : 'password'}
                name="password"
                id="passInput"
                placeholder="Password"
                className={`${
                  password !== confirmPassword ? 'border-red-500' : ''
                }  border-2 rounded-lg w-full p-2 outline-none`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                title="button-visibility"
                className="absolute top-1/2 transform -translate-y-1/2 right-4"
                onClick={() => setVisibilityPassword((prev) => !prev)}
              >
                {!visibilityPassword ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
              </button>
            </div>
          </div>

          <div className="block lg:mb-4">
            <label htmlFor="confirmPassInput">Ulangi Password Baru</label>
            <br />
            <div className="relative">
              <input
                type={visibilityConfPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassInput"
                placeholder="Konfirmasi password"
                className={`${
                  password !== confirmPassword ? 'border-red-500' : ''
                } border-2 rounded-lg w-full p-2 outline-none`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4"
                onClick={() => setVisibilityConfPassword((prev) => !prev)}
              >
                {!visibilityConfPassword ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
              </button>
            </div>
          </div>
          <br />

          <button
            disabled={
              isLoading || password !== confirmPassword || password.length === 0 || confirmPassword.length === 0
                ? true
                : false
            }
            className={`${
              isLoading || password !== confirmPassword || password.length === 0 || confirmPassword.length === 0
                ? 'cursor-not-allowed'
                : ''
            } text-white bg-orange-05 rounded-xl w-full h-10  mb-10 flex items-center justify-center`}
            onClick={handleSubmit}
          >
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" size={20} /> : 'Ganti'}
          </button>
          <br />
        </div>
      </div>

      <div className="bg-primary-dark-blue p-8 lg:p-16 lg:w-1/3 flex items-center justify-center">
        <Image src="/img/iconPreducation.png" alt="logo" width={150} height={150} className="mx-auto" priority />
      </div>
      <ToastContainer />
    </div>
  )
}

export default ResetPass
