"use client";
import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div className="flex gap-3 max-lg:px-0  h-screen w-full lg:p-8   max-lg:flex-col  ">
      <Provider store={store}>
        <Sidebar />
        <div className=" max-lg:px-4  w-full">{children}</div>
      </Provider>
    </div>
  );
};

export default Layout;
