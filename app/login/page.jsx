"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PiEye } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [idAdmin, setIdAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputPassMerah = () => {
    const passInput = document.querySelector("#passInput");
    passInput.classList.add("border-red-500");

    setTimeout(() => {
      passInput.classList.remove("border-red-500");
    }, 5000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        username: idAdmin,
        password: password,
        redirect: false,
      });
      if (response.ok) {
        toast.success("Anda berhasil masuk!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setInterval(() => {
          router.replace("/admin/dashboard");
        }, 2000);
        setIsLoading(false);
      } else {
        toast.error("Username atau password salah", {
          position: toast.POSITION.TOP_RIGHT,
        });
        inputPassMerah();
        setIsLoading(false);
      }
    } catch (error) {
      throw new Error("Internal server error");
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Bagian Kiri */}
      <div className="bg-dark-blue-05 p-8 lg:p-16 lg:w-1/3 flex items-center justify-center">
        <Image src="/icon_belajar.svg" alt="logo" width={150} height={150} className="mx-auto" priority />
      </div>

      {/* Bagian Kanan */}
      <div className="p-8 lg:p-16 lg:w-2/3 flex items-center justify-center">
        <div className="w-full lg:w-2/3">
          <h1 className="font-bold text-xl text-dark-blue-05 mb-8 lg:mb-12 text-center">Login</h1>

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
              <Link href="/forgot-password" className="text-dark-blue-05">
                Lupa Kata Sandi
              </Link>
            </p>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="passInput"
              placeholder="Password"
              className="float-left border-2 rounded-lg w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="absolute right-4 top-14" onClick={toggleVisibility}>
              {!showPassword ? <PiEye color="grey" size={30} /> : <PiEyeSlash color="grey" size={30} />}
            </button>
          </div>
          <br />
          <br />

          {/* Login button */}
          <button disabled={isLoading ? true : false} onClick={handleSubmit} className={`text-white bg-dark-blue-05 rounded-lg w-full px-2 h-10 mb-10 flex items-center justify-center ${isLoading ? "cursor-not-allowed" : ""}`}>
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" size={20} /> : "Masuk"}
          </button>
          <br />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
