import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import bookRoute from "./route/book_route.js";
import cors from "cors";
import userRoute from "./route/user_route.js";

const app = express();
app.use(cors());

app.use(express.json());

dotenv.config();
const port = process.env.PORT || 5000;
const url= process.env.URL;

// Connect to mongobd
// try{
//     mongoose.connect(url, { });
//     console.log("Mongobd connected");
// } catch(error){

// }

mongoose.connect(url,{}).then(()=>{
    console.log("Mongobd connected");
}).catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
});

// defining routes
app.use("/book",bookRoute);
app.use("/user",userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
