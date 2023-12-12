"use client";

import React, { useEffect, useState } from "react";
import MapItems from "./MapItems";
import axios from "axios";

const HomePAGE = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_DB + "/films"}`)
        .then((res) => setAllFilms(res.data.allFilms.results))
        .then(() => setLoading(false));
    };

    const getFilms = async () => {
      await axios
        .request(`${process.env.NEXT_PUBLIC_DB + "/trendfilms"}`)
        .then((res) => setTrendingFilms(res.data.trendFilms.results));
    };

    getFilms();
    getData();
  }, []);

  return (
    <div className="h-screen  flex flex-col gap-6">
      {loading ? (
        ""
      ) : (
        <MapItems allFilms={allFilms} trendingFilms={trendingFilms} />
      )}
    </div>
  );
};

export default HomePAGE;
