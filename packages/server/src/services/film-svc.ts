import { Schema, model } from "mongoose";
import { Film } from "../models/film";
import FilmModel from "../models/film";

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

function create(json: Film): Promise<Film> {
    const f = new FilmModel(json);
    return f.save();
  }


function update(id: string, film: Film): Promise<Film> {
  return FilmModel.findByIdAndUpdate(id, film, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    return updated as Film;
  });
}

function remove(id: string): Promise<void> {
  return FilmModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}

export default { index, get, create, update, remove };
