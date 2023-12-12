"use client";
import { setUserData, setUserWishlist } from "@/app/Redux/User";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { BsDot } from "react-icons/bs";
import { IoIosBookmark } from "react-icons/io";
import { RiFilmFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast, ToastContainer } from "react-toastify";

const Favorites = () => {
  const [matchedItems, setMatchedItems] = useState([]);
  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toastSuccess = () => toast.success("Kaldırıldı");

  useEffect(() => {
    setLoading(true);
    const username = localStorage.getItem("username");
    const getData = async () => {
      await axios
        .post(process.env.NEXT_PUBLIC_API + "/addFavorites", {
          username,
        })
        .then((res) => {
          setMatchedItems(res.data.product);
          dispatch(setUserWishlist(res.data.product));
          setLoading(false);
        });
    };

    if (username) {
      dispatch(setUserData(username));
      getData();
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      dispatch(setUserData(""));
      setMatchedItems([]);
      dispatch(setUserWishlist([]));
    }
  }, [username]);

  const handlerAddFavorites = async (item) => {
    console.log("a");
    setDeleteLoading(true);
    if (username) {
      await axios
        .post(process.env.NEXT_PUBLIC_API + "/addFavorites", {
          username,
          id: item.product_id,
        })
        .then((res) => {
          setMatchedItems(res.data.product);
          setDeleteLoading(false);
          toastSuccess();
        });
    } else {
      console.log(matchedItems);
    }
  };

  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <div className="lg:p-8 ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-12"
        ref={parent}
      >
        <span className="mb-4">Favorites</span>
        <ToastContainer
          position="top-center"
          autoClose={250}
          hideProgressBar={true}
          closeOnClick
          theme="dark"
        />

        {matchedItems.length < 1 && (
          <div className="flex-1 text-center lg:text-3xl">
            You have no bookmark, nothing to show
          </div>
        )}
      </motion.div>

      {loading ? (
        ""
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-12"
          ref={parent}
        >
          {matchedItems?.map((item) => (
            <div
              className="max-[1000px]:w-full  rounded-lg h-[200px!important] overflow-hidden  "
              key={item.product_id}
            >
              <div className="h-full cursor-pointer abc relative  ">
                <button
                  onClick={() => handlerAddFavorites(item)}
                  disabled={deleteLoading}
                  className="bg-[#949dad] rounded-full w-8 h-8 p-1  flex items-center justify-center hover:bg-slate-200  transition-all cursor-pointer absolute z-50 right-4 top-4 "
                >
                  <IoIosBookmark
                    fill="#fc4747"
                    className="transition-all"
                    size={21}
                  />
                </button>

                <div className={` flex absolute w-full h-full text-shadow `}>
                  <span className=" p-1  flex items-center justify-center px-3  absolute z-50 left-0 bottom-10  text-gray-300 ">
                    {item.product_year ? (
                      item.product_year
                    ) : (
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full ${
                          item.product_title === "Game of Thrones"
                            ? "bg-gradient-to-r from-green-400 to-blue-500"
                            : Math.floor(item.product_average) >= 8
                            ? "bg-red-500"
                            : Math.floor(item.product_average) >= 6
                            ? "bg-orange-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {item.product_title === "Game of Thrones"
                          ? 10
                          : Math.floor(item.product_average)}
                      </span>
                    )}{" "}
                    <BsDot /> <RiFilmFill size={14} /> &nbsp;{" "}
                    {item.product_year ? "Movie" : "Series"}
                    <BsDot />{" "}
                    {item.product_language[0].toUpperCase() +
                      item.product_language[1]}
                  </span>
                  <span className="p-1 flex items-center  px-3  absolute z-50 left-0 bottom-3 w-full truncate ">
                    {item.product_title}
                  </span>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.product_backdrop}`}
                  className="h-full w-full object-fill transition-all"
                />
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
