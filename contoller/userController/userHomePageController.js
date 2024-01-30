import userModel from "../../model/userModel.js";
import bcrypt from "bcrypt";
import * as referralCode from "referral-codes";

const getLandingPage = async (req, res) => {
  console.log("landing page");
  res.json("landing Page");
};

const getUserSignup = async (req, res) => {
  console.log("usersignuppage");
  res.json("sign up page")
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
      return res.json("User already exists");
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
        return res.status(400).json({
          error: "Check whether the referral code is correct if given, Otherwise provide a referral code",
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

export { getLandingPage, getUserSignup, postUserSignup };
