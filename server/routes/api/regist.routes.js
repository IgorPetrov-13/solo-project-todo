// ./routes/api/auth.routes.js
const regRoute = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const generateTokens = require("./../../utils/generateTokens");
const jwt = require("jsonwebtoken");
const cookiesConfig = require("../../config/cookiesConfig");

// ...

regRoute.post("/", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' ) {
      res.status(400).json({ message: "заполните все поля" });
      return;
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "Такой пользователь уже зарегестрирован" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    delete user.dataValues.password;
    const { accessToken, refreshToken } = generateTokens({ user });

    if (user) {
      res
        .status(201)
        .cookie("refreshToken", refreshToken, { httpOnly: true })
        .json({ message: "success", user, accessToken });
      return;
    }

    res.status(400).json({ message: "Что-то пошло не так" });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = regRoute;
