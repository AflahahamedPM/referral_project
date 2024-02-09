import express from "express";
const router = express.Router();
import { validationResult } from "express-validator";
import { loginValidator, signupValidator } from "../middlewares/validation.js";
import {
  getLandingPage,
  getUserSignup,
  postUserSignup,
  postUserLogin,
  getReferralLists
} from "../contoller/userController/userHomePageController.js";
import verifyToken from "../middlewares/jwtAuthentication.js"

const validateRequest = (handler) => async(req,res) => {  //This validateRequest function will check whether there is validation errors during both login and signup
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await handler(req, res);
    };

    
router.route("/").get(getLandingPage);

router
.route("/userSignup")
.get(getUserSignup)
.post(signupValidator,validateRequest(postUserSignup));

router
.route('/userLogin')
.post(loginValidator,validateRequest(postUserLogin))

router
.route("/user/referralList")
.get(verifyToken,getReferralLists)

export default router;
