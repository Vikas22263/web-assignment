
import jwt from "jsonwebtoken";
import { EnvVars } from "../../config/serverConfig";

const { SECRET_KEY } = EnvVars;
if (!SECRET_KEY) {
  throw new Error("JWT key is not defined");
}

export const userAuthCheck = async (
  req,
  res,
  next,
) => {
  try {
    const accessToken = req.cookies["Bearer"];
    const authHeader = req.header("Authorization");
    let token: string | null = null;

    if (accessToken) {
      token = accessToken;
    } else if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(400).send({ success: false, message: "Invalid Token" });
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Forbidden" });
      }

      (req as any).user = decoded;

      if (!decoded.email) {
        return res
          .status(400)
          .send({ success: false, message: "Unauthorized" });
      }
      next();
    });
  } catch (error) {
    console.error("Error in adminAuthCheck middleware", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};
