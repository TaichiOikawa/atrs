import * as bcrypt from "bcrypt";
import * as express from "express";
import ms from "ms";
import { AppDataSource } from "../../../data-source";
import { User } from "../../entity/User";
import { jwtHelper, jwtPayloadType } from "../../modules/jwtHelper";

const loginRouter: express.Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

loginRouter.post("/", async (req, res, next) => {
  console.log("Login request received");
  try {
    const user = req.body;

    if (!user.loginId || !user.password) {
      res.status(400).send("Invalid request");
      return;
    }

    const userInDb = await userRepository.findOne({
      where: { login_id: user.loginId },
    });

    if (!userInDb) {
      res.status(401).send("Invalid user or password");
      return;
    }

    const match = await bcrypt.compare(user.password, userInDb.password);
    if (match) {
      const payload: jwtPayloadType = {
        user_id: userInDb.user_id,
        login_id: userInDb.login_id,
        permission: userInDb.permission,
      };
      const jwtToken = jwtHelper.createToken(payload);
      res
        .cookie("jwtToken", jwtToken, {
          httpOnly: true,
          expires: new Date(Date.now() + ms("2d")),
        })
        .send("Login successful");
    } else {
      res.status(401).send("Invalid user or password");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
});

export default loginRouter;
