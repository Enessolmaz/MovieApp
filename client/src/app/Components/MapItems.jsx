import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosBookmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserWishlist } from "../Redux/User";
import { FreeMode } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import Trending from "./Trending/Trending";
import Recommended from "./Recommended/Recommended";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

const MapItems = ({ allFilms, trendingFilms }) => {
  const [nowMatchedItems, setNowMatchedItems] = useState([]);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const toastError = (msg) => toast.error(msg);


  const handlerAddFavorites = async (item) => {
    if (username) {
      await axios
        .post(process.env.NEXT_PUBLIC_API + "/addFavorites", {
          username,
          id: item?.id,
          language: item?.original_language,
          title: item?.original_title,
          year: item?.release_date.slice(0, 4),
          backdrop: item?.backdrop_path,
        })
        .then((res) => {
          setNowMatchedItems(res.data.product);
        });
    } else {
      toastError("Film Kaydetmek için Giriş Yapınız");
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
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
      dispatch(setUserData(username));
      getData();
    }
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      dispatch(setUserData(""));
      setNowMatchedItems(null);
      // dispatch(setUserWishlist([]));
    }
  }, [username, nowMatchedItems]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        closeOnClick
        theme="dark"
      />
      <div className="flex flex-col relative    ">
        <div className="w-full absolute lg:px-16  ">
          <Trending
            trendingFilms={trendingFilms}
            favorites={handlerAddFavorites}
            nowMatchedItems={nowMatchedItems}
          />
        </div>

        <Recommended
          allFilms={allFilms}
          favorites={handlerAddFavorites}
          nowMatchedItems={nowMatchedItems}
        />
      </div>
    </motion.div>
  );
};

export default MapItems;
