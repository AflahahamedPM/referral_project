import { body } from "express-validator";

  const loginValidator = [
    body("email", "email should not be empty").notEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "password should not  be empty").notEmpty(),
  ];

  const signupValidator = [
    body('userName')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name should not contain numbers or special characters'),
    body("userName", "The minimum user name length is 5 characters").isLength({min:5}),
    body("email", "Invalid email").isEmail(),
    body("email", "email should not be empty").notEmpty(),
    body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('Password should contain at least one uppercase letter, one digit, and one special character'),
    body(
      "password",
      "The minimum password length is 6 characters"
    ).isLength({ min: 6 }),
    body("phoneNumber")
    .notEmpty()
    .withMessage('Phone number should not be empty')
    .matches(/^\d+$/)
    .withMessage("Phone number should be digits")
    .isLength({min:10,max:10})
    .withMessage("10 digit phone number is required")
    .custom((value) => typeof value === 'number')
    .withMessage('Phone number should be of type Number'),
  ];


export {loginValidator, signupValidator};
