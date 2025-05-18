import { Schema, model } from "mongoose";
import { Film } from "../models/film";

const FilmSchema = new Schema<Film>(
    {
      filmImage: { type: String, required: true, trim: true },
      ratingLink: { type: String, required: true, trim: true },
    },
    { collection: "films" }
  );

const FilmModel = model<Film>("Film", FilmSchema);

function index(): Promise<Film[]> {
    return FilmModel.find();
}

function get(id: string): Promise<Film> {
    return FilmModel.findById(id)
      .then((film) => {
        if (!film) throw new Error(`${id} Not Found`);
        return film;
      });
}

export default { index, get };
