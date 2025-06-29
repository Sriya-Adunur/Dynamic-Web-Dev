"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var films_exports = {};
__export(films_exports, {
  default: () => films_default
});
module.exports = __toCommonJS(films_exports);
var import_express = __toESM(require("express"));
var import_film_svc = __toESM(require("../services/film-svc"));
var import_auth = require("./auth");
var import_film3 = __toESM(require("../models/film"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_film_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_film_svc.default.get(id).then((film) => res.json(film)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newFilm = req.body;
  import_film_svc.default.create(newFilm).then((film) => res.status(201).json(film)).catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedFilm = req.body;
  import_film_svc.default.update(id, updatedFilm).then((film) => res.json(film)).catch((err) => res.status(404).end());
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  import_film_svc.default.remove(id).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
router.put("/:id/review", import_auth.authenticateUser, async (req, res) => {
  const { id } = req.params;
  const username = req.user?.username;
  let { rating, comment } = req.body;
  console.log("\u{1F539} Incoming Review Submit");
  console.log("\u27A1\uFE0F Film ID:", id);
  console.log("\u27A1\uFE0F Username:", username);
  console.log("\u27A1\uFE0F Rating:", rating);
  console.log("\u27A1\uFE0F Comment:", comment);
  rating = Number(rating);
  if (!username || isNaN(rating) || !comment) {
    return res.status(400).send("Missing or invalid fields");
  }
  await import_film3.default.updateOne(
    { _id: id },
    { $pull: { reviews: { username } } }
  );
  const updated = await import_film3.default.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        reviews: {
          username,
          rating,
          comment,
          date: (/* @__PURE__ */ new Date()).toISOString()
        }
      }
    },
    { new: true }
  );
  console.log("Updated Film:", updated);
  if (!updated) return res.status(404).send("Film not found");
  res.status(200).json({ message: "Review saved", reviews: updated.reviews });
});
var films_default = router;
