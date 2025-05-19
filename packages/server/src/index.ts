// src/index.ts
import express, { Request, Response } from "express";
import Films from "./services/film-svc";
import films from "./routes/films";
import { connect } from "./services/mongo";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("movies");

app.use(cors());
app.use(express.static(staticDir));
app.use(express.json());

app.use("/api/films", films);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/films", (req, res) => {
  Films.index().then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch((err) => {
    console.error(err);
    res.status(500).send();
  });
});

// GET film by ID
app.get("/films/:id", (req, res) => {
  const { id } = req.params;

  Films.get(id).then((data) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(data));
  }).catch((err) => {
    console.error(err);
    res.status(404).send();
  });
});