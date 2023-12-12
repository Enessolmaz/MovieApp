import express from "express";
import cors from "cors";
import { DB_CONNECT } from "./db.js";
import route from "./routes/route.js";
import * as dotenv from "dotenv";


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

DB_CONNECT();

const PORT = 3004;

app.listen(PORT, console.log(PORT));

app.use("/api", route);
