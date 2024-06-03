const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const StudentUserRouter = require('./router/user.route.js')
const questionRouter = require('./router/question.route.js')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/question', questionRouter)
app.use('/api/studentuser', StudentUserRouter)

const uri = "mongodb+srv://obeewon20:O3ZX4wPoIQxSjaJT@cluster0.vh9mqxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
  .connect(uri)
  .then(() => {
    app.listen(3007, () => {
        console.log("listening at 3007");
      });
    console.log("connected");
  })
  .catch(() => {
    console.log("connection failed"); 
  });

