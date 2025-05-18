import express from "express";
import mongoose from "mongoose";

import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import "dotenv/config";
import { connectSocket } from "./controllers/connectingSocket.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
const server = createServer(app);
const io = connectSocket(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.set("port", process.env.PORT || 8000);

const mongoDBURL = process.env.mongoDBURL;

const start = async () => {
  const mongoDbConnect = await mongoose.connect(mongoDBURL);

  server.listen(app.get("port"), () => {
    console.log("App running in port 8000");
  });

  console.log(`DB connected Host: ${mongoDbConnect.connection.host}`);
};
start();
