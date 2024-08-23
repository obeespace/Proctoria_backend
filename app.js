import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import cors from 'cors';

import studentUserRouter from './backend/auth/route.js';
import questionRouter from './backend/question/user/route.js';
import { logger, authenticate } from "./middleware/auth.middleware.js";
import env from "./config/env.js";
import connectToDatabase from "./config/mongo.config.js";

const app = express()
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors())

app.use(logger);
app.use('/api/question', questionRouter)
app.use('/api/studentuser', studentUserRouter)

connectToDatabase();

app.listen(env.port, () => {
    console.log(`listening at http://localhost:${env.port}`);
});