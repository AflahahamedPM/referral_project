import { body } from "express-validator";

  const loginValidator = [
    body("email", "email should not be empty").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "password should not  be empty").not().isEmpty(),
  ];

  const signupValidator = [
    body("userName", "username should not  be empty").not().isEmpty(),
    body("userName", "The minimum user name length is 5 characters").isLength({min:5}),
    body("email", "Invalid email").isEmail(),
    body("email", "email should not be empty").not().isEmpty(),
    body("password", "password should not be empty").not().isEmpty(),
    body(
      "password",
      "The minimum password length is 6 characters"
    ).isLength({ min: 6 }),
  ];


export {loginValidator, signupValidator};
