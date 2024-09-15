import * as jwt from "jsonwebtoken";
import ms from "ms";

require("dotenv").config();

const jweSecret: string = process.env.JWT_SECRET || "secret";

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
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.log(err);
    }
  }
  static apiVerifyToken(req: any, res: any, next: any) {
    let token = "";
    if (req.cookies.jwtToken) {
      token = req.cookies.jwtToken;
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwtHelper.verifyToken(token);
    if (decoded) {
      const { user_id, login_id, permission } = decoded as jwtPayloadType;
      const token = jwtHelper.createToken({ user_id, login_id, permission });
      res.cookie("jwtToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + ms("2d")), // cookie expires
      });
      res.locals.isAuthenticated = true;
      next();
    } else {
      console.log("Token is invalid");
      res.status(401).json({ isAuthenticated: false });
    }
  }
}
