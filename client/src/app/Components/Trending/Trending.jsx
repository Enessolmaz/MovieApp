import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { IoIosBookmark } from "react-icons/io";
import { FaPlayCircle } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { RiFilmFill } from "react-icons/ri";

const Trending = ({ trendingFilms, favorites, nowMatchedItems }) => {
  const [id, setId] = useState();

  return (
    <div className="flex flex-col justify-center gap-6 overflow-hidden    ">
      <span className="text-2xl">Trending</span>
      <Swiper slidesPerView={3} spaceBetween={50} className="swiper-wrapper ">
        {trendingFilms.slice(0, 7).map((item) => (
          <SwiperSlide
            className="bg-indigo-500 xl:w-[400px!important]    w-[240px!important]   rounded-lg h-[230px!important] overflow-hidden bg-inherit transition-all "
            key={item.id}
          >
            <div className="cursor-pointer border-none w-full h-full relative abc transition-all ">
              <span
                className="bg-[#949dad] rounded-full w-8 h-8 p-1  flex items-center justify-center hover:bg-slate-200  transition-all cursor-pointer absolute z-50 right-4 top-4 "
                onClick={() => favorites(item)}
              >
                <IoIosBookmark
                  fill={` ${
                    nowMatchedItems?.find(
                      (items) => +items.product_id === item.id
                    )
                      ? "#fc4747"
                      : "#636363"
                  }`}
                  className="transition-all"
                  size={21}
                />
              </span>
              <div
                className={` flex absolute w-full h-full text-shadow transition-all `}
              >
                <span className=" p-1 flex items-center justify-center px-3  absolute z-50 left-0 bottom-10   text-gray-300 overflow-hidden whitespace-nowrap text-ellipsis ">
                  {item.release_date.slice(0, 4)} <BsDot />{" "}
                  <RiFilmFill size={14} /> &nbsp; Movie
                  <BsDot />{" "}
                  {item.original_language[0].toUpperCase() +
                    item.original_language[1]}
                </span>
                <span className="p-1 flex items-center px-3  absolute z-50 left-0 bottom-3 w-full  overflow-hidden whitespace-nowrap text-ellipsis ">
                  {item.title}
                </span>
              </div>

              <img
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                className="h-full w-full object-fill transition-all"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;

// import React, { useEffect } from "react";
// import Slider from "react-slick";

// const Trending = ({ trendingFilms }) => {
//   console.log(trendingFilms);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="h-full">
//       TRENDING
//       <div className="flex flex-1 w-screen">
//         <Slider {...settings}>
//           {trendingFilms.slice(0, 5).map((item) => (
//             <div className="w-96">
//               <img
//                 src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
//                 alt=""
//                 srcset=""
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Trending;
