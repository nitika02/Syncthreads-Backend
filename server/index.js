const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const connection = require("./connection/db");
const User = require("./models/userModel");
const UserRouter = require("./controllers/userController")

const app = express();
dotenv.config()
app.use(cors())
app.use(express.json())
app.use("/api", UserRouter)


const PORT = process.env.PORT || 5000

connection
app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`)
})