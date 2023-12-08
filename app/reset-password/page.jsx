'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import dummy from '../../data/dummy';
import { PiEye } from 'react-icons/pi';
import { PiEyeSlash } from 'react-icons/pi';
import { resetPassword } from '@/utils/fetch';

const ResetPass = () => {
  //useState untuk password
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get('token');
  console.log(resetPasswordToken);

  const [passValue, setPassValue] = useState({
    password: '',
    showPass: false,
  });
  const [passValue2, setPassValue2] = useState({
    password: '',
    showPass: false,
  });

  const handleSubmit = async () => {
    try {
      const response = await resetPassword(resetPasswordToken, passValue.password, passValue2.password);
      const data = await response.json();
      if (response.ok) {
        alert('berhasil reset password');
      } else {
        alert(data.message);
      }
    } catch (err) {
      throw err;
    }
  };

  //handle onchange password
  const handlePass = (event) => {
    setPassValue({ ...passValue, password: event.target.value });
  };
  const handlePass2 = (event) => {
    setPassValue2({ ...passValue2, password: event.target.value });
  };

  //buat ganti dari type password ke type text
  const toggleVisibility1 = () => {
    setPassValue({ ...passValue, showPass: !passValue.showPass });
  };
  const toggleVisibility2 = () => {
    setPassValue2({ ...passValue2, showPass: !passValue2.showPass });
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

  //validasi saat tombol di pencet
  // const validasi = () => {
  //   if (passValue.password === passValue2.password && passValue.password !== '' && passValue2.password !== '') {
  //     showAlert('Reset password berhasil!', 'success');
  //     dummy.password = passValue2.password;

  //     setTimeout(() => {
  //       window.location.href = '/adminLogin';
  //     }, 3000);
  //   } else if (passValue.password === '' && passValue2.password === '') {
  //     showAlert('Password harus diisi!', 'error');
  //   } else {
  //     showAlert('Password tidak sama!', 'error');
  //   }
  // };
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
              type={passValue.showPass ? 'text' : 'password'}
              name="password"
              id="passInput"
              placeholder="Password"
              className="float-left border-2 rounded-lg w-full p-2"
              value={passValue.password}
              onChange={handlePass}
              required
            />

            <button className="absolute right-4 top-14" onClick={toggleVisibility1}>
              {!passValue.showPass ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
            </button>
          </div>

          {/* PASSWORD mastiin*/}
          <div className="mt-2 relative block mb-4 lg:mb-8">
            <br />
            <p className="float-left">Ulangi Password Baru</p>
            <br />
            <input
              type={passValue2.showPass ? 'text' : 'password'}
              name="password"
              id="passInput"
              placeholder="Password"
              className="float-left border-2 rounded-lg w-full p-2"
              value={passValue2.password}
              onChange={handlePass2}
              required
            />

            <button className="absolute right-4 top-14" onClick={toggleVisibility2}>
              {!passValue2.showPass ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
            </button>
          </div>
          <br />
          <br />

          {/* Login button */}
          <button className="text-white bg-orange-05 rounded-xl w-full p-2 mb-10" onClick={handleSubmit}>
            Ganti
          </button>
          <br />
          {/* div kosong buat tempat alert */}
          <div className="tempatAlert fixed bottom-6 lg:bottom-2 lg:left-[33%] left-1/2  transform -translate-x-1/2 flex justify-center items-center w-full lg:w-auto sm:bottom-2"></div>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="bg-primary-dark-blue p-8 lg:p-16 lg:w-1/3 flex items-center justify-center">
        <Image src="/img/iconPreducation.png" alt="logo" width={150} height={150} className="mx-auto" priority />
      </div>
    </div>
  );
};

export default ResetPass;
