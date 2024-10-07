import { userRepository } from "../repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // Import mongoose to use ObjectId type
import { EnvVars } from "./../config/serverConfig";

interface IUserPayload {
  email: string;
  fullname: string;
}

class userService {
  userRepo = new userRepository();

  async createUser(data: {
    fullname: string;
    email: string;
    password: string;
  }) {
    try {
      const isUserPresnt = await this.userRepo.isUserAlreadyPresent(data.email);
      if (!isUserPresnt.success) {
        const createdUser = await this.userRepo.registerUser(data);
        return { success: true, user: createdUser };
      } else {
        return { success: false, message: "User already exists" };
      }
    } catch (error: any) {
      return { success: false, message: error.message || "An error occurred" };
    }
  }

  async login(data: { email: string; password: string }) {
    try {
      const isUserPresnt = await this.userRepo.isUserAlreadyPresent(data.email);
      if (!isUserPresnt) {
        return { success: false, message: "User Not exists please register" };
      }
      const isMatch = await bcrypt.compare(
        data.password,
        isUserPresnt.data.password
      );

      if (!isMatch) {
        return { success: false, message: "Incorrect password" };
      }
      const { email, fullname } = isUserPresnt.data;
      const Token = this.createToken({ email, fullname });

      return {
        success: true,
        message: "Login success",
        data: { email, fullname, accessToken: Token },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  private createToken(payload: IUserPayload) {
    const expiresIn = "30d";
    const token = jwt.sign(payload, EnvVars.SECRET_KEY, { expiresIn });
    return token;
  }

  async getUserDetails(email: string) {
  try {
    const isUserPresent = await this.userRepo.isUserAlreadyPresent(email);
    
  
    if (!isUserPresent.success) {
      return { success: false, message: "User does not exist, please register" };
    }

    const { email: userEmail, fullname } = isUserPresent.data;
    return {
      success: true,
      message: "User details fetched successfully",
      data: { email: userEmail, fullname },
    };
  } catch (error) {
    return { success: false, message: "An error occurred while fetching user details" };
  }
}

}

export default userService;
