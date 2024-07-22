const refreshTokenRoute = require("express").Router();
const cookiesConfig = require("../../config/cookiesConfig");
const verifyRefreshToken = require("../../middleware/verifyRefreshToken");
const generateTokens = require("../../utils/generateTokens");

refreshTokenRoute.get("/refresh", verifyRefreshToken, async (req, res) => {
  try {
    const { accessToken, refreshToken } = generateTokens({
      user: res.locals.user,
    });
    res
      .cookie("refreshToken", refreshToken, cookiesConfig)
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Произошла ошибка при обновлении токенов" });
  }
});

module.exports = refreshTokenRoute;
