"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const router = useRouter();
  const [focus, setFocus] = useState(null);
  const toastSuccess = (msg) => toast.success(msg);
  const toastError = (msg) => toast.error(msg);

  const url = process.env.NEXT_PUBLIC_API + "/createUser";

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post(process.env.NEXT_PUBLIC_API + "/createUser", {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        if (res.data.status === "success") {
          toastSuccess(res.data.msg);
          setTimeout(() => router.push("/"), 1000);
        } else {
          toastError(res.data.msg);
        }
      });
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full h-full  ">
      {url}
      <ToastContainer
        position="top-center"
        autoClose={250}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
      />

      <Link href="/" className="max-[1000px]:px-6">
        <img
          src="https://entertainment-web-app-seven.vercel.app/assets/logo.svg"
          alt=""
          width={32}
        />
      </Link>
      <div className=" flex flex-col rounded-2xl  justify-center bg-[#161d2f] gap-4 p-6">
        <span className="text-2xl px-7">Sign Up</span>
        <form className="flex flex-col gap-4 p-6">
          <input
            className="text-white bg-inherit outline-none px-2"
            type="text"
            name="username"
            required
            onChange={handleUser}
            placeholder="Username"
            onFocus={() => setFocus("username")}
          />
          <span
            className={`w-full transition-all h-[1px] mb-4 ${
              focus === "username" ? "bg-[#d1daf0]" : "bg-[#5a698f]"
            }`}
          />
          <input
            className="text-white bg-inherit outline-none px-2"
            type="text"
            name="password"
            onChange={handleUser}
            required
            placeholder="Password"
            onFocus={() => setFocus("password")}
          />
          <span
            className={`w-full h-[1px] transition-all  ${
              focus === "password" ? "bg-[#d1daf0]" : "bg-[#5a698f]"
            }`}
          />
          <button
            onClick={registerUser}
            className="bg-[#fc4747] p-3 rounded mt-2 hover:bg-[white] hover:text-black transition"
          >
            Create an account
          </button>
          <span className="w-full font-bold text-sm flex gap-2 items-center justify-center">
            Already have an account?
            <Link href="/login" className="text-[#fc4747]">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
