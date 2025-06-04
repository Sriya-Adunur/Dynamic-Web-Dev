import express, { Request, Response } from "express";
import Films from "../services/film-svc";
import { Film } from "../models/film";
import { authenticateUser } from "./auth";

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

/*router.post("/:id/reviews", authenticateUser, (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const username = (req as any).user?.username;

  if (!username || typeof rating !== "number" || !comment) {
    return res.status(400).send("Missing fields");
  }

  const review = {
    username,
    rating,
    comment,
    date: new Date().toISOString()
  };

  Films.addReview(id, review)
    .then(() => res.status(201).send({ message: "Review saved" }))
    .catch((err) => res.status(500).send(err));
});*/

router.post("/:id/reviews", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const username = (req as any).user?.username;

  if (!username || typeof rating !== "number" || !comment) {
    return res.status(400).send("Missing fields");
  }

  const film = await Films.get(id);

  if (!film) return res.status(404).send("Film not found");

  // Remove existing review by this user (if any)
  film.reviews = (film.reviews || []).filter((r) => r.username !== username);

  // Add new/updated review
  film.reviews.push({
    username,
    rating,
    comment,
    date: new Date().toISOString()
  });

  await film.save();
  res.status(201).send({ message: "Review saved" });
});



export default router;
