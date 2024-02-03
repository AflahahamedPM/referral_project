import { body } from "express-validator";

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email should not be empty")
    .isEmail()
    .withMessage("Invalid email"),

  body("password", "password should not  be empty").notEmpty(),
];

const signupValidator = [
  body("userName")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should not contain numbers or special characters")
    .isLength({ min: 5, max: 20 })
    .withMessage("The user name length should be between 5-20 letters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email should not be empty"),

  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      "Password should contain at least one uppercase letter, one digit, and one special character"
    )
    .isLength({ min: 6 })
    .withMessage("The minimum password length is 6 characters"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number should not be empty")
    .matches(/^\d+$/)
    .withMessage("Phone number should be digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("10 digit phone number is required")
    .custom((value) => typeof value === "number")
    .withMessage("Phone number should be of type Number"),
];

export { loginValidator, signupValidator };
