// src/index.ts
import express, { Request, Response } from "express";
import Films from "./services/film-svc";
import films from "./routes/films";
import profile from "./routes/profile";
import { connect } from "./services/mongo";
import fs from "node:fs/promises";
import path from "path";
import cors from "cors";
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("movies");

app.use(cors());
app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);
app.use("/api/films", authenticateUser, films);
app.use("/api/profile", profile);

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

