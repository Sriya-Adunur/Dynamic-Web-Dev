"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var film_svc_exports = {};
__export(film_svc_exports, {
  default: () => film_svc_default
});
module.exports = __toCommonJS(film_svc_exports);
var import_mongoose = require("mongoose");
const FilmSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true },
    plot: { type: String, required: true },
    genres: [String],
    cast: [{ name: String, role: String }],
    filmImage: { type: String, required: true },
    reviews: [{ username: String, rating: Number, comment: String, date: String }]
  },
  { collection: "films" }
);
const FilmModel = (0, import_mongoose.model)("Film", FilmSchema);
function index() {
  return FilmModel.find();
}
function get(id) {
  return FilmModel.findById(id).then((film) => {
    if (!film) throw new Error(`${id} Not Found`);
    return film;
  });
}
function create(json) {
  const f = new FilmModel(json);
  return f.save();
}
function update(id, film) {
  return FilmModel.findByIdAndUpdate(id, film, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    return updated;
  });
}
function remove(id) {
  return FilmModel.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
function addReview(id, review) {
  return FilmModel.findByIdAndUpdate(
    id,
    { $push: { reviews: review } },
    { new: true }
  ).then((updated) => {
    if (!updated) throw new Error(`${id} not found`);
  });
}
var film_svc_default = { index, get, create, update, remove, addReview };
