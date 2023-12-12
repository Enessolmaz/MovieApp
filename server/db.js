import mongoose from "mongoose";


export const DB_CONNECT = async (req, res) => {
  await mongoose
    .connect(process.env.PRIVATE_DB)
    .then(() => console.log("Bağlandı"));
};
