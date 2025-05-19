import express, { Request, Response } from "express";
import Films from "../services/film-svc";
import { Film } from "../models/film";

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

export default router;
