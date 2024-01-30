import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODBCONNECTION_STRING)
    .then(() => {
      console.log("connected to database");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default dbConnect;
