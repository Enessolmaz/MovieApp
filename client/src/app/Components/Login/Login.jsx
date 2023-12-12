"use client";
import { setUserData } from "@/app/Redux/User";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(null);
  const toastSuccess = (msg) => toast.success(msg);
  const toastError = (msg) => toast.error(msg);

  const handleUser = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    if (user.username && user.username) {
      await axios
        .post(process.env.NEXT_PUBLIC_API + "/loginUser", {
          username: user.username,
          password: user.password,
        })
        .then((res) => {
          if (res.data.status === "success") {
            localStorage.setItem("username", res.data.user.username);
            dispatch(setUserData(res.data.user.username));
            router.push("/");
          } else {
            toastError(res.data.msg);
          }
        });
    } else {
      toastError("Giriş Başarısız");
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full h-full  ">
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
          alt="logo"
          width={32}
        />
      </Link>

      <div className=" flex flex-col rounded-2xl  justify-center bg-[#161d2f] gap-4 p-6">
        <span className="text-2xl px-7">Login</span>
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
            type="password"
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
            onClick={loginUserHandler}
            className="bg-[#fc4747] p-3 rounded mt-2 hover:bg-[white] hover:text-black transition"
          >
            Login to your account
          </button>

          <span className="w-full font-bold text-sm flex gap-2 items-center justify-center">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#fc4747]">
              {" "}
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
