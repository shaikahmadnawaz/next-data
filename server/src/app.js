import express from "express";
import cors from "cors";
import dataRouter from "./routes/data.routes.js";

const app = express();

app.use(cors({ origin: "*" }));

app.use(
  express.json({
    limit: "15mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "15mb",
  })
);

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to NextData API" });
});

app.use("/api/v1/data", dataRouter);

export default app;
