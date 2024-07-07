import { mongo } from "mongoose";

const env = {
    database: process.env.DB_NAME,
    mongoUri: process.env.MONGO_URI,
}