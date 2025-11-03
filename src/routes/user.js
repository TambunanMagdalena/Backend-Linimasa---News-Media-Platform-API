const express = require("express");
const Route = express.Router();

const {
  register,
  registerWithImage,
  login,
  token,
  readUser,
  updateUser,
  updateUserWithImage,
  deleteUser,
} = require("../controllers/user");

const { uploadProfileImages } = require("../controllers/upload");

// Route untuk register TANPA image (JSON)
Route.post("/register", register);

// Route untuk register DENGAN image (form-data)
Route.post("/register-with-image", uploadProfileImages, registerWithImage);

Route.post("/login", login)
  .post("/token", token)
  .get("/", readUser)
  .get("/:user_id", readUser)
  .patch("/:user_id", updateUser) // Update tanpa image
  .patch("/:user_id/with-image", uploadProfileImages, updateUserWithImage) // Update dengan image
  .delete("/:user_id", deleteUser);

module.exports = Route;
