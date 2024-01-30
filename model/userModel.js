import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  referrallCode: {
    type: String,
    required: true,
  },
  referreredBy:{
    name:{
      type:mongoose.Types.ObjectId,
      ref:"userDetails",
    }
  },
  myReferrals: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref:"userDetails"
      },
    },
  ],
});

const userModel = mongoose.model("userDetails", userSchema);

export default userModel;
