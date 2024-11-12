import express, { Request, Response } from "express";
import { AppDataSource } from "./common/data-source";
import metaController from "./controller/MetaRoute";
import cors from "cors";
import dotenv from "dotenv";
import { upload } from "./multer/config";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

const app = express();
app.use(express.json());

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// SQLite
AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connection Establised .....");
  })
  .catch((error) => console.log(error));

app.use("/api", metaController);

app.post("/upload", (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({
      message: "Video uploaded successfully!",
    });
  });
});

export default app;
