// In a new file or within an existing configuration file, e.g., `config/mongo.config.js`

import { connect } from "mongoose";

const MONGO_URI ="mongodb+srv://obeewon20:O3ZX4wPoIQxSjaJT@cluster0.vh9mqxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToDatabase = () => {
    connect(MONGO_URI)
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((err) => {
            console.error("Database connection failed", err);
        });
};

export default connectToDatabase;