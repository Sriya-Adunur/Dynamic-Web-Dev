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
var film_exports = {};
__export(film_exports, {
  default: () => film_default
});
module.exports = __toCommonJS(film_exports);
var import_mongoose = require("mongoose");
const ReviewSchema = new import_mongoose.Schema({
  username: String,
  rating: Number,
  comment: String,
  date: String
});
const FilmSchema = new import_mongoose.Schema({
  title: { type: String, required: true },
  plot: { type: String, required: true },
  genres: [String],
  cast: [{ name: String, role: String }],
  filmImage: { type: String, required: true },
  reviews: [ReviewSchema]
});
const FilmModel = import_mongoose.models.Film || (0, import_mongoose.model)("Film", FilmSchema);
var film_default = FilmModel;
