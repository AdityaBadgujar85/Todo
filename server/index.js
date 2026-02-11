const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const DbConnection = require('./databaseConnection')
dotenv.config();
const todoRoutes = require("./routes/todoRoutes")
const app = express();
const PORT = process.env.PORT || 8000;
DbConnection();
app.use(cors());
app.use(express.json());

app.use("/todos",todoRoutes)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})