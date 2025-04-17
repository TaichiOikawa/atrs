import * as jwt from "jsonwebtoken";
import ms from "ms";
import { AppDataSource } from "../../data-source";
import { PermissionEnum, User } from "../entity/User";

require("dotenv").config();

const jweSecret: string = process.env.JWT_SECRET as string;
const userRepository = AppDataSource.getRepository(User);

export type jwtPayloadType = {
  user_id: number;
  login_id: string;
  permission: PermissionEnum;
  organization_id: string;
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
      console.error(err);
    }
  }

  static async apiVerifyToken(req: any, res: any, next: any) {
    if (req.headers && req.headers.authorization) {
      console.log("req.headers.authorization:", req.headers.authorization);
      const AccessToken = req.headers.authorization.split(" ");
      if (!AccessToken && AccessToken[0] !== "Bearer" && !AccessToken[1]) {
        return res.status(401).json({ isAuthenticated: false });
      }
      if (
        process.env.CLIENT_TOKEN &&
        AccessToken[1] === process.env.CLIENT_TOKEN
      ) {
        res.locals.isAuthenticated = true;
        return next();
      }
    }

    let token = "";
    if (req.cookies.jwtToken) {
      token = req.cookies.jwtToken;
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwtHelper.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ isAuthenticated: false });
    }
    const { user_id, login_id } = decoded as jwtPayloadType;
    const userInDb = await userRepository.findOne({
      where: { user_id: user_id },
      relations: ["organization"],
    });

    if (userInDb && userInDb.login_id === login_id) {
      const token = jwtHelper.createToken({
        user_id,
        login_id,
        permission: userInDb.permission,
        organization_id: userInDb.organization.organization_id,
      });
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + ms("4d")), // cookie expires
      });

      res.locals.isAuthenticated = true;
      res.locals.userInfo = userInDb;
      next();
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }
  }
}
