"use client";

import React, { useState } from "react";
import Image from "next/image";
import dummy from "../../data/dummy";
import { PiEye } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

const LoginPage = () => {
  //useState untuk password
  const [passValue, setPassValue] = useState({
    password: "",
    showPass: false,
  });

  //useState untuk idAdmin
  const [idAdmin, setIdAdmin] = useState("");

  //handle onchange password
  const handlePass = (event) => {
    setPassValue({ ...passValue, password: event.target.value });
  };

  //buat ganti dari type password ke type text
  const toggleVisibility = () => {
    setPassValue({ ...passValue, showPass: !passValue.showPass });
  };

  //function buat bikin alert
  const showAlert = (message, type = "info", duration = 5000) => {
    const tempatAlert = document.querySelector(".tempatAlert");
    const alertElement = document.createElement("div");
    alertElement.classList.add("custom-alert");
    alertElement.classList.add("text-white");
    alertElement.classList.add("rounded-lg");
    alertElement.classList.add("w-[250px]");
    alertElement.classList.add("items-center");
    alertElement.classList.add("text-center");
    alertElement.classList.add("py-2");
    alertElement.classList.add("px-5");
    alertElement.classList.add("text-xs");
    alertElement.classList.add("bottom-6");
    alertElement.classList.add("transition");
    alertElement.classList.add("ease-in-out");
    alertElement.classList.add("duration-300");
    alertElement.classList.add("mx-auto");
    alertElement.classList.add("absolute");
    alertElement.classList.add("bottom-[20px]");
    alertElement.classList.add("left-[50%]");
    alertElement.classList.add("translate-x-[-50%]");

    if (type === "success") {
      alertElement.classList.add("/");
    } else if (type === "error") {
      alertElement.classList.add("/");
    }

    alertElement.textContent = message;
    tempatAlert.appendChild(alertElement);

    setTimeout(() => {
      alertElement.style.display = "none";
      tempatAlert.removeChild(alertElement);
    }, duration);
  };
  const inputIdMerah = () => {
    const IdInput = document.querySelector("#IdInput");
    IdInput.classList.add("border-red-500");

    setTimeout(() => {
      IdInput.classList.remove("border-red-500");
    }, 5000);
  };

  const inputPassMerah = () => {
    const passInput = document.querySelector("#passInput");
    passInput.classList.add("border-red-500");

    setTimeout(() => {
      passInput.classList.remove("border-red-500");
    }, 5000);
  };

  const validasi = () => {
    if (idAdmin === dummy.idAdmin && passValue.password !== dummy.password) {
      showAlert("Maaf kata sandi salah", "error");
      inputPassMerah();
    } else if (
      idAdmin === dummy.idAdmin &&
      passValue.password === dummy.password
    ) {
      showAlert("Berhasil masuk", "success");
    } else if (
      idAdmin !== dummy.idAdmin &&
      passValue.password === dummy.password
    ) {
      showAlert("Alamat email tidak terdaftar!", "error");
      inputIdMerah();
    } else {
      showAlert("Maaf kata sandi salah atau email tidak terdaftar", "error");
      inputIdMerah();
      inputPassMerah();
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Bagian Kiri */}
      <div className="bg-DARKBLUE05 p-8 lg:p-16 lg:w-1/3 flex items-center justify-center">
        <Image
          src="/Belajar_white 3.svg"
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
          priority
        />
      </div>

      {/* Bagian Kanan */}
      <div className="p-8 lg:p-16 lg:w-2/3 flex items-center justify-center">
        <div className="w-full lg:w-2/3">
          <h1 className="font-bold text-xl text-DARKBLUE05 mb-8 lg:mb-12 text-center">
            Login
          </h1>

          {/* ID ADMIN */}
          <div className="mb-4 lg:mb-8">
            <p className="float-left">ID Admin</p>
            <br />
            <input
              type="text"
              name="IDAdmin"
              id="IdInput"
              placeholder="ID Admin"
              className="float-left border-2 rounded-lg w-full p-2 z-0"
              value={idAdmin}
              onChange={(e) => {
                setIdAdmin(e.target.value);
              }}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-2 relative block mb-4 lg:mb-8">
            <br />
            <p className="float-left">Password</p>

            <p className="float-right">
              <a href="/remake_password" className="text-DARKBLUE05">
                Lupa Kata Sandi
              </a>
            </p>
            <br />
            <input
              type={passValue.showPass ? "text" : "password"}
              name="password"
              id="passInput"
              placeholder="Password"
              className="float-left border-2 rounded-lg w-full p-2"
              value={passValue.password}
              onChange={handlePass}
              required
            />

            <button
              className="absolute right-4 top-14"
              onClick={toggleVisibility}
            >
              {!passValue.showPass ? (
                <PiEye color="grey" size={30} />
              ) : (
                <PiEyeSlash color="grey" size={30} />
              )}
            </button>
          </div>
          <br />
          <br />

          {/* Login button */}
          <button
            className="text-white bg-DARKBLUE05 rounded-lg w-full p-2 mb-10"
            onClick={validasi}
          >
            Masuk
          </button>
          <br />
          {/* div kosong buat tempat alert */}
          <div className="tempatAlert fixed bottom-6 lg:bottom-2 lg:left-[67%] left-1/2  transform -translate-x-1/2 flex justify-center items-center w-full lg:w-auto sm:bottom-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
