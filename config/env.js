import dotenv from "dotenv";

const envs = dotenv.config({path: ".env"});

const MONGO_URI = "mongodb+srv://obeewon20:O3ZX4wPoIQxSjaJT@cluster0.vh9mqxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const env = {
    mongoUri: envs.parsed?.BASE_URL || MONGO_URI,
    port: envs.parsed.PORT || 3007,
}

export default env;


