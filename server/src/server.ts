import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { plantRouter } from "./plant.routes";

// load environment variables
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error("No ATLAS_URI in config.env");
  process.exit(1);
}

// connect to db
connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());

    //start express server

    app.use("/plants", plantRouter);
    app.listen(5200, () => {
      console.log(`Server running at http://localhost:5200..`);
    });
  })
  .catch((error) => console.error(error));
