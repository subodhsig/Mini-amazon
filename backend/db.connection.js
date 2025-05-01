import mongoose from "mongoose";

const dbName = "mini-amazon";
const dbUserName = "subodh";
const dbPassword = encodeURIComponent("Subodh123");
const dbHost = "cluster0.3qz14.mongodb.net";
const dbOptions = "retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`;

    await mongoose.connect(url);

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDB;
