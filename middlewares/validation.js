import { body } from "express-validator";

  const loginValidator = [
    body("email", "email does not empty").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "password is required").not().isEmpty(),
    body("password", "The minimum password length is 6 characters").isLength({
      min: 6,
    }),
  ];

  const signupValidator = [
    body("userName", "username does not Empty").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "password does not Empty").not().isEmpty(),
    body(
      "password",
      "The minimum password length is 6 characters"
    ).isLength({ min: 6 }),
    body("referralCode", "referral code should be provided")
      .not()
      .isEmpty(),
  ];


export {loginValidator, signupValidator};
