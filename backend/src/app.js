import express from "express";
import dotenv from 'dotenv'
import dbConnect from "./config/db.js";
import baseRouter from './routes/index.js'
import cors from 'cors'

dotenv.config()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin:'http://localhost:5173'}))
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5001

//intialize the server
const server=app.listen(port, () => console.log("Server up and running at port:",port))

dbConnect()

app.use("/api", baseRouter)

//listen unhandleRejection
  process.on('unhandledRejection', (reason, p) => {
  //get slack notification about the error  
    console.error('Unhandled Rejection at:', p, 'reason:', reason)
  server.close()
  process.exit(1)
});
process.on('uncaughtException', (e) => {
  console.error('Uncaught exception at:', e)
  
  server.close()
  process.exit(1)
});