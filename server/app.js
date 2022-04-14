import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { ConnectDB } from "./lib/mongodb";
import "dotenv/config";

const app = express();

ConnectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});