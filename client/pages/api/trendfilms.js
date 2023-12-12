const getTrendingFilms = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=c62349385c4fc0200af204fcb3219d86&language=en-US&page=1",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        dataType: "application/json",
      },
    }
  ).then((item) => {
    return item.json();
  });
  return data;
};

export default async function handler(req, res) {
  try {
    res.status(200).json({
      msg: "Başarılı",
      trendFilms: await getTrendingFilms(),
    });
  } catch (error) {
    console.error(error);
  }
}
