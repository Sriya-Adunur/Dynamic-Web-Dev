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
var film_svc_exports = {};
__export(film_svc_exports, {
  default: () => film_svc_default
});
module.exports = __toCommonJS(film_svc_exports);
var import_film2 = __toESM(require("../models/film"));
function index() {
  return import_film2.default.find();
}
function get(id) {
  return import_film2.default.findById(id).then((film) => {
    if (!film) throw new Error(`${id} Not Found`);
    return film;
  });
}
function create(json) {
  const f = new import_film2.default(json);
  return f.save();
}
function update(id, film) {
  return import_film2.default.findByIdAndUpdate(id, film, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    return updated;
  });
}
function remove(id) {
  return import_film2.default.findByIdAndDelete(id).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var film_svc_default = { index, get, create, update, remove };
