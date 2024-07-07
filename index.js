import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import cors from 'cors';

import StudentUserRouter from './router/user.route.js';
import questionRouter from './router/question.route.js';
import { logger, authenticate } from "./middleware/auth.middleware.js";

const app = express()
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors())

app.use(logger);
app.use('/api/question', authenticate, questionRouter)
app.use('/api/studentuser', StudentUserRouter)

const uri = "mongodb+srv://obeewon20:O3ZX4wPoIQxSjaJT@cluster0.vh9mqxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
connect(uri)
  .then(() => {
    app.listen(3007, () => {
        console.log("listening at 3007");
      });
    console.log("connected");
  })
  .catch(() => {
    console.log("connection failed"); 
  });

