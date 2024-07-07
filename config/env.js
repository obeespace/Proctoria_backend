
const MONGO_URI ="mongodb+srv://obeewon20:O3ZX4wPoIQxSjaJT@cluster0.vh9mqxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const env = {
    mongoUri: process.env.MONGO_URI || MONGO_URI,
    port: process.env.PORT || 3007,
}

export default env;