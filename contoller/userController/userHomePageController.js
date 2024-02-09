import userModel from "../../model/userModel.js";
import bcrypt from "bcrypt";
import * as referralCode from "referral-codes";
import jwt from "jsonwebtoken";

const getLandingPage = async (req, res) => {
  console.log("landing page");
  res.json("landing Page");
};

const getUserSignup = async (req, res) => {
  console.log("usersignuppage");
  res.json("sign up page");
};

const postUserSignup = async (req, res) => {
  try {
    const { userName, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const generateReferralCode = referralCode.generate({
      pattern: "##-###-##",
      charset: referralCode.charset("alphanumeric"),
    });

    const userExist = await userModel.findOne({ email: email });

    if (userExist) {
      return res.json({ error: "User already exists" });
    }

    let newUser;

    if ((await userModel.countDocuments()) === 0) {
      newUser = new userModel({
        userName: userName,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        referrallCode: generateReferralCode[0],
      });
    } else {
      const referredByUser = await userModel.findOne({
        referrallCode: req.body.referralCode,
      });

      if (!referredByUser) {
        return res.status(401).json({
          error:
            "Check whether the referral code is correct if given, Otherwise provide a referral code",
        });
      }

      newUser = new userModel({
        userName,
        email,
        password: hashedPassword,
        phoneNumber,
        referrallCode: generateReferralCode[0],
        referreredBy: { name: referredByUser._id },
      });

      await userModel.findByIdAndUpdate(referredByUser._id, {
        $push: {
          myReferrals: { user: newUser._id },
        },
      });
    }

    await newUser.save();
    return res.json("Successfully signed up");
  } catch (error) {
    console.log("Error in user signup - ", error);
    return res.status(500).json("Internal Server Error");
  }
};

const postUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email: email });

    if (!checkUser) return res.status(401).json({ error: "Email not found" });

    let comparePasword = await bcrypt.compare(password, checkUser.password);

    const accessToken = jwt.sign({ userId: checkUser._id },process.env.JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "30 days",
      }
    );

    return checkUser && comparePasword
      ? res.status(200).json({ message: "succesfully logged in", token: accessToken })
      : res.status(401).json({ error: "Password is not correct" });
  } catch (error) {
    console.log("error in login - ", error);
    return res.status(500).json("Internal Server Error");
  }
};

const getReferralLists = async (req, res) => {
  try {
    const currentUser = await userModel.findById(req.userId);
    const referralIds = currentUser.myReferrals.map((users) => {
      return users.user;
    });

    const userArray = [];
    for (const ids of referralIds) {
      const userLIsts = await userModel.findOne({ _id: ids });
      const name = userLIsts.userName;
      userArray.push(name);
    }
    res.json({ referrals: userArray });
  } catch (error) {
    console.log("error in getting refferal lsits - ", error);
    return res.status(500).json("Internal server error");
  }
};

export {
  getLandingPage,
  getUserSignup,
  postUserSignup,
  postUserLogin,
  getReferralLists,
};
