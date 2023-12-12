import React, { useEffect } from "react";
import { IoIosBookmark } from "react-icons/io";
import { RiFilmFill } from "react-icons/ri";
import { BsDot } from "react-icons/bs";
import { motion } from "framer-motion";

const Recommended = ({ allFilms, favorites, nowMatchedItems }) => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const items = {
    hidden: {
      opacity: 0,
      translateY: 20,
    },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <div className="w-full overflow-hidden flex flex-col lg:pl-16 gap-8 mt-80 mb-4  ">
      <span className="text-2xl">Recommended for you</span>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-6 max-[1000px]:gap-12 w-[100%] "
      >
        {allFilms.slice(0, 20).map((item) => (
          <motion.div
            variants={items}
            key={item.id}
            className="rounded-lg w-[300px] h-[150px] max-[1000px]:w-full max-[1000px]:h-64  overflow-hidden  abc relative cursor-pointer   "
          >
            <span
              className="bg-[#949dad] rounded-full w-8 h-8 p-1  flex items-center justify-center hover:bg-slate-200  transition-all cursor-pointer absolute z-50 right-4 top-4 "
              onClick={() => favorites(item)}
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
                {item.release_date.slice(0, 4)} <BsDot />{" "}
                <RiFilmFill size={14} /> &nbsp; Movie
                <BsDot />{" "}
                {item.original_language[0].toUpperCase() +
                  item.original_language[1]}
              </span>
              <span className="p-1 flex items-center  px-3  absolute z-50 left-0 bottom-3  overflow-hidden whitespace-nowrap text-ellipsis ">
                {item.title}
              </span>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
              className="h-full w-full object-fill transition-all"
            />
          </motion.div>
          // </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Recommended;
