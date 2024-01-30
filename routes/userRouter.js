import express from "express";
const router = express.Router();
import { validationResult } from "express-validator";
import { loginValidator, signupValidator } from "../middlewares/validation.js";
import {
  getLandingPage,
  getUserSignup,
  postUserSignup,
} from "../contoller/userController/userHomePageController.js";

router.route("/").get(getLandingPage);

router
  .route("/userSignup")
  .get(getUserSignup)
  .post(signupValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await postUserSignup(req, res);
  });

export default router;
