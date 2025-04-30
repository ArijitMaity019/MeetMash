import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);
const start = async() =>{
    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://arijitm802:Arijit123@cluster0.kw5y4go.mongodb.net/");
    console.log(`Mongoc connected DB host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), ()=>{
        console.log("server is listening on 8000 port");
    })
}
start();
