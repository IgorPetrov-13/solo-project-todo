// ./routes/api/auth.routes.js
const authRoute = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const generateTokens = require("./../../utils/generateTokens");
const jwt = require("jsonwebtoken");
const cookiesConfig = require("../../config/cookiesConfig");

// ...

authRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);
  if (!email || !password) {
    res.status(400).json({ message: "Не все поля заполнены" });
    return;
  }

  if (email.trim() === "" || password.trim() === "") {
    res.status(400).json({ message: "Поля пустые" });
    return;
  }

  try {
    const targetUser = await User.findOne({where: {email}});
    console.log("TARGET", targetUser);
    if (!targetUser)
      return res.status(401).json({ message: "Неверный email или пароль" });

    const IsValidPassword = bcrypt.compare(password, targetUser.password);
    if (!IsValidPassword) {
      res
        .status(401)
        .json({ error, message: "Не правильный пароль или логин" });
      return;
    }
    const user = targetUser.get(); // Получаем объект пользователя из базы данных
    delete user.password; // Удаляем поле password из объекта пользователя

    // Генерируем токены для пользователя

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie("refreshToken", refreshToken, cookiesConfig) // Отправляем refresh token в куки
      .json({ message: "success", accessToken, user }); // Отправляем токен доступа и данные пользователя
  } catch (error) {
    res.status(500).json({ error, message: "Нет пользователя NYN" });
  }
});

authRoute.get("/logout", async (req, res) => {
  res.clearCookie("refreshToken").json({ message: "Logout OK" });
});
module.exports = authRoute;
