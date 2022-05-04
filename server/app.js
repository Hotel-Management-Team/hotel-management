import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { ConnectDB } from "./lib/mongodb";
import "dotenv/config";
import cron from "node-cron";
import isWaitingRoom from "./utils/IsWaitingRoom";

const app = express();

ConnectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
isWaitingRoom();

cron.schedule(
  "0 0 * * *",
  () => {
    // run every day at 00:00:00
    isWaitingRoom();
  },
  {
    scheduled: true,
    timezone: "Asia/Bangkok",
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
