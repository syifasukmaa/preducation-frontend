'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { PiEye } from 'react-icons/pi';
import { PiEyeSlash } from 'react-icons/pi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '@/utils/fetch';

const ResetPass = () => {
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get('token');

  const [password, setPassword] = useState({
    password: '',
    showPass: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    password: '',
    showPass: false,
  });

  const handleSubmit = async () => {
    try {
      const response = await resetPassword(resetPasswordToken, password.password, confirmPassword.password);

      const data = await response.json();

      if (response.ok) {
        toast.success('Anda berhasil mengubah password', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPassword({ ...password, password: '' });
        setConfirmPassword({ ...confirmPassword, password: '' });
      } else if (password.password !== confirmPassword.password) {
        showAlert('Password tidak sama!', 'error');
      } else if (password.password === '' && confirmPassword.password === '') {
        showAlert('Password harus diisi!', 'error');
      } else {
        toast.error(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const handlePass = (event) => {
    setPassword({ ...password, password: event.target.value });
  };
  const handlePass2 = (event) => {
    setConfirmPassword({ ...confirmPassword, password: event.target.value });
  };

  const toggleVisibility1 = () => {
    setPassword({ ...password, showPass: !password.showPass });
  };
  const toggleVisibility2 = () => {
    setConfirmPassword({ ...confirmPassword, showPass: !confirmPassword.showPass });
  };

  //function buat bikin alert
  const showAlert = (message, type = 'info', duration = 5000) => {
    const tempatAlert = document.querySelector('.tempatAlert');
    const alertElement = document.createElement('div');
    alertElement.classList.add('custom-alert');
    alertElement.classList.add('text-white');
    alertElement.classList.add('rounded-lg');
    alertElement.classList.add('w-[250px]');
    alertElement.classList.add('items-center');
    alertElement.classList.add('text-center');
    alertElement.classList.add('py-2');
    alertElement.classList.add('px-5');
    alertElement.classList.add('text-xs');
    alertElement.classList.add('bottom-6');
    alertElement.classList.add('transition');
    alertElement.classList.add('ease-in-out');
    alertElement.classList.add('duration-300');
    alertElement.classList.add('mx-auto');
    alertElement.classList.add('absolute');
    alertElement.classList.add('bottom-[20px]');
    alertElement.classList.add('left-[50%]');
    alertElement.classList.add('translate-x-[-50%]');

    if (type === 'success') {
      alertElement.classList.add('bg-alert-green');
    } else if (type === 'error') {
      alertElement.classList.add('bg-alert-red');
    }

    alertElement.textContent = message;
    tempatAlert.appendChild(alertElement);

    setTimeout(() => {
      alertElement.style.display = 'none';
      tempatAlert.removeChild(alertElement);
    }, duration);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Bagian Kiri */}
      <div className="p-8 lg:p-16 lg:w-2/3 flex items-center justify-center">
        <div className="w-full lg:w-2/3">
          <h1 className="font-bold text-2xl text-primary-dark-blue  mb-8 lg:mb-12 text-left">Reset Password</h1>

          {/* PASSWORD 1 */}
          <div className="mt-2 relative block mb-4 lg:mb-8">
            <br />
            <p className="float-left">Masukkan Password Baru</p>

            <br />
            <input
              type={password.showPass ? 'text' : 'password'}
              name="password"
              id="passInput"
              placeholder="Password"
              className="float-left border-2 rounded-lg w-full p-2"
              value={password.password}
              onChange={handlePass}
              required
            />

            <button
              className="absolute right-4 top-14"
              onClick={toggleVisibility1}
            >
              {!password.showPass ? (
                <PiEye
                  color="grey"
                  size={30}
                />
              ) : (
                <PiEyeSlash
                  color="grey"
                  size={30}
                />
              )}
            </button>
          </div>

          <div className="mt-2 relative block mb-4 lg:mb-8">
            <br />
            <p className="float-left">Ulangi Password Baru</p>
            <br />
            <input
              type={confirmPassword.showPass ? 'text' : 'password'}
              name="password"
              id="passInput"
              placeholder="Password"
              className="float-left border-2 rounded-lg w-full p-2"
              value={confirmPassword.password}
              onChange={handlePass2}
              required
            />

            <button
              className="absolute right-4 top-14"
              onClick={toggleVisibility2}
            >
              {!confirmPassword.showPass ? (
                <PiEye
                  color="grey"
                  size={30}
                />
              ) : (
                <PiEyeSlash
                  color="grey"
                  size={30}
                />
              )}
            </button>
          </div>
          <br />
          <br />

          <button
            className="text-white bg-orange-05 rounded-xl w-full p-2 mb-10"
            onClick={handleSubmit}
          >
            Ganti
          </button>
          <br />
          <div className="tempatAlert fixed bottom-6 lg:bottom-2 lg:left-[33%] left-1/2  transform -translate-x-1/2 flex justify-center items-center w-full lg:w-auto sm:bottom-2"></div>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="bg-primary-dark-blue p-8 lg:p-16 lg:w-1/3 flex items-center justify-center">
        <Image
          src="/img/iconPreducation.png"
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
          priority
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPass;
