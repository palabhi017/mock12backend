const express = require("express")
const app = express()
const {connection} = require("./db")
const { userRouter } = require("./Routes/Auth.route")
const { empRouter } = require("./Routes/Emp.route")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
app.use(cors())
app.use(express.json())




app.use("/user",userRouter)
app.use("/employee",empRouter)



connectDB().then(() => {
  app.listen(process.env.port, () => {
      console.log("listening for requests");
  })
})
