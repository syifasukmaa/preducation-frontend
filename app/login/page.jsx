'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { PiEye } from 'react-icons/pi';
import { PiEyeSlash } from 'react-icons/pi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const [idAdmin, setIdAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await signIn('credentials', {
        username: idAdmin,
        password: password,
        redirect: false,
      });
      if (response.ok) {
        toast.success('Anda berhasil masuk!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push('/admin/dashboard');
        setIsLoading(false);
      } else {
        let messageError;
        if (response.error == 'Wrong password or username') {
          messageError = 'Username atau password salah';
        } else if (response.error == "You don't have permission to login as admin") {
          messageError = 'Akses terlarang, role anda bukan admin';
        } else {
          messageError = 'Internal Server Error';
        }
        throw new Error(messageError);
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex flex-col w-full min-h-screen lg:flex-row'>
      <div className='flex items-center justify-center p-8 bg-primary-dark-blue lg:p-16 lg:w-1/3'>
        <Image
          src='/img/iconPreducation.png'
          alt='logo'
          width={150}
          height={150}
          className='mx-auto'
          priority
        />
      </div>
      <div className='flex items-center justify-center p-8 lg:p-16 lg:w-2/3'>
        <div className='w-full lg:w-2/3'>
          <h1 className='mb-8 text-xl font-bold text-center text-orange-05 lg:mb-12'>Login</h1>
          <div className='lg:mb-3'>
            <label htmlFor='idAdmin'>ID Admin</label>
            <br />
            <input
              type='text'
              name='IDAdmin'
              id='idAdmin'
              placeholder='ID Admin'
              className='z-0 w-full p-2 border-2 rounded-lg'
              value={idAdmin}
              onChange={(e) => {
                setIdAdmin(e.target.value);
              }}
              required
            />
          </div>
          <div className='block lg:mb-3'>
            <label htmlFor='passInputAdmin'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='passInputAdmin'
                placeholder='Password'
                className='w-full p-2 border-2 rounded-lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className='absolute transform -translate-y-1/2 right-4 top-1/2'
                onClick={toggleVisibility}
                title='button-visibility'
              >
                {!showPassword ? (
                  <PiEye
                    color='grey'
                    size={30}
                  />
                ) : (
                  <PiEyeSlash
                    color='grey'
                    size={30}
                  />
                )}
              </button>
            </div>
          </div>
          <br />
          <button
            disabled={isLoading || idAdmin.length === 0 || password.length === 0 ? true : false}
            onClick={handleSubmit}
            className={`text-white bg-orange-05 rounded-lg w-full px-2 h-10 mb-10 flex items-center justify-center ${
              isLoading || idAdmin.length === 0 || password.length === 0 ? 'cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters
                className='animate-spin'
                size={20}
              />
            ) : (
              'Masuk'
            )}
          </button>
          <br />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
