import * as jwt from "jsonwebtoken";
import ms from "ms";
import { AppDataSource } from "../../data-source";
import { User } from "../entity/User";

require("dotenv").config();

const jweSecret: string = process.env.JWT_SECRET || "secret";
const userRepository = AppDataSource.getRepository(User);

export type jwtPayloadType = {
  user_id: number;
  login_id: string;
  permission: string;
};

export class jwtHelper {
  static jwtOptions = {
    expiresIn: "30d",
  };

  static createToken(payload: jwtPayloadType) {
    const token = jwt.sign(payload, jweSecret, this.jwtOptions);
    return token;
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, jweSecret);
      return decoded;
    } catch (err: unknown) {
      // invalid signatureは無視
      if (err instanceof jwt.JsonWebTokenError) return null;
      console.log(err);
    }
  }

  static async apiVerifyToken(req: any, res: any, next: any) {
    let token = "";
    if (req.cookies.jwtToken) {
      token = req.cookies.jwtToken;
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwtHelper.verifyToken(token);
    if (!decoded) {
      console.log("Token is invalid");
      return res.status(401).json({ isAuthenticated: false });
    }
    const { user_id, login_id } = decoded as jwtPayloadType;
    const userInDb = await userRepository.findOne({
      where: { user_id: user_id },
    });

    if (userInDb && userInDb.login_id === login_id) {
      const token = jwtHelper.createToken({
        user_id,
        login_id,
        permission: userInDb.permission,
      });
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + ms("2d")), // cookie expires
      });

      res.locals.isAuthenticated = true;
      res.locals.userInfo = userInDb;
      next();
    } else {
      console.log("Token is invalid");
      return res.status(401).json({ isAuthenticated: false });
    }
  }
}
