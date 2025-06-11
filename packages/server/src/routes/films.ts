import express, { Request, Response } from "express";
import Films from "../services/film-svc";
import { Film } from "../models/film";
import { authenticateUser } from "./auth";
import { Review } from "../models/film";
import FilmModel from "../models/film";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Films.index()
    .then((list: Film[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Films.get(id)
    .then((film: Film) => res.json(film))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newFilm = req.body;

  Films.create(newFilm)
    .then((film: Film) => res.status(201).json(film))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedFilm = req.body;

  Films.update(id, updatedFilm)
    .then((film: Film) => res.json(film))
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Films.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

router.put("/:id/review", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const username = (req as any).user?.username;
  let { rating, comment } = req.body;

  console.log("🔹 Incoming Review Submit");
  console.log("➡️ Film ID:", id);
  console.log("➡️ Username:", username);
  console.log("➡️ Rating:", rating);
  console.log("➡️ Comment:", comment);

  rating = Number(rating);
  if (!username || isNaN(rating) || !comment) {
    return res.status(400).send("Missing or invalid fields");
  }

await FilmModel.updateOne(
  { _id: id },
  { $pull: { reviews: { username } } }
);

const updated = await FilmModel.findOneAndUpdate(
  { _id: id },
  {
    $push: {
      reviews: {
        username,
        rating,
        comment,
        date: new Date().toISOString()
      }
    }
  },
  { new: true }
);


  console.log("✅ Updated Film:", updated);

  if (!updated) return res.status(404).send("Film not found");
  res.status(200).json({ message: "Review saved", reviews: updated.reviews });
});


export default router;
