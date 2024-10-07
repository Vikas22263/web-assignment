import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

interface IUserSchema {
  fullname: string;
  email: string;
  password: string;
}

type IUserModel = IUserSchema & Document;

const userSchema = new mongoose.Schema<IUserSchema>({
  fullname: {
    type: String,
    required: [true, "fullname is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

userSchema.pre("save", async function (next) {
  const user = this as IUserModel;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User: Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);
export default User;
