"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { IoIosBookmark } from "react-icons/io";
import { RiFilmFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setUserData, setUserWishlist } from "@/app/Redux/User";

const Series = () => {
  const [allSeries, setAllSeries] = useState([]);
  const [nowMatchedItems, setNowMatchedItems] = useState([]);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(false);

  console.log(process.env.NEXT_PUBLIC_DB);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setLoading(true);
    const getSeries = async () => {
      await axios
        .request(process.env.NEXT_PUBLIC_DB + "/series")
        .then((res) => setAllSeries(res.data.results))
        .then(() => setLoading(false));
    };
    const getData = async () => {
      await axios
        .post(process.env.NEXT_PUBLIC_API + "/addFavorites", {
          username,
        })
        .then((res) => {
          setNowMatchedItems(res.data.product);
        });
    };
    if (username) {
      getData();
    }
    getSeries();
  }, []);

  const handlerAddFavorites = async (item) => {
    if (username) {
      await axios
        .post(process.env.NEXT_PUBLIC_API + "/addFavorites", {
          username,
          id: item.id,
          language: item?.original_language,
          title: item?.original_name,
          backdrop: item?.backdrop_path,
          vote: Math.floor(item?.vote_average),
        })
        .then((res) => {
          setNowMatchedItems(res.data.product);
        });
    } else {
      alert("Diziyi Kaydetmek için Giriş Yapınız");
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      dispatch(setUserData(""));
      setNowMatchedItems(null);
    }
  }, [username, nowMatchedItems]);

  return (
    <div className="lg:p-8 flex flex-col gap-6 ">
      <span className="text-2xl">Recommended Series For You</span>
      {loading ? (
        ""
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-12 "
        >
          {allSeries.map((item) => (
            <div
              className="max-[1000px]:w-full  rounded-lg h-[200px!important] overflow-hidden    "
              key={item.id}
            >
              <div className="h-full cursor-pointer abc relative   ">
                <span
                  className="bg-[#949dad] rounded-full w-8 h-8 p-1  flex items-center justify-center hover:bg-slate-200  transition-all cursor-pointer absolute z-50 right-4 top-4 "
                  onClick={() => handlerAddFavorites(item)}
                >
                  <IoIosBookmark
                    fill={` ${
                      nowMatchedItems?.find((ex) => +ex.product_id === item.id)
                        ? "#fc4747"
                        : "#636363"
                    }`}
                    className="transition-all"
                    size={21}
                  />
                </span>
                <div className={` flex absolute w-full h-full text-shadow  `}>
                  <span className=" p-1 flex items-center justify-center px-3  absolute z-50 left-0 bottom-10 text-gray-300  ">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        item.name === "Game of Thrones"
                          ? "bg-gradient-to-r from-green-400 to-blue-500"
                          : Math.floor(item.vote_average) >= 8
                          ? "bg-red-500"
                          : Math.floor(item.vote_average) >= 6
                          ? "bg-orange-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {item.name === "Game of Thrones"
                        ? 10
                        : Math.floor(item.vote_average)}
                    </span>{" "}
                    <BsDot /> <RiFilmFill size={14} /> &nbsp; Series
                    <BsDot />{" "}
                    {item.original_language[0].toUpperCase() +
                      item.original_language[1]}
                  </span>
                  <span className="p-1 flex items-center  px-3  absolute z-50 left-0 bottom-3  overflow-hidden whitespace-nowrap text-ellipsis ">
                    {item.name}
                  </span>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
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

export default Series;
