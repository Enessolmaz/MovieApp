const getSeries = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/trending/tv/day?api_key=c62349385c4fc0200af204fcb3219d86&language=en-US"
  ).then((item) => {
    return item.json();
  });
  return data;
};

export default async function handler(req, res) {
  res.status(200).json(await getSeries());
}
