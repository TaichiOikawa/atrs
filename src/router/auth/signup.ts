import * as bcrypt from "bcrypt";
import * as express from "express";
import ms from "ms";
import { AppDataSource } from "../../../data-source";
import { Organization } from "../../entity/Organization";
import { User } from "../../entity/User";
import { jwtHelper, jwtPayloadType } from "../../modules/jwtHelper";

const signupRouter: express.Router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const organizationRepository = AppDataSource.getRepository(Organization);

signupRouter.post("/", async (req, res, next) => {
  try {
    if (
      !req.body.loginId ||
      !req.body.password ||
      !req.body.name ||
      !req.body.organizationId
    ) {
      res.status(400).send("Invalid request");
      return;
    }

    const user = await userRepository.findOne({
      where: { login_id: req.body.loginId },
    });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    const organization = await organizationRepository.findOne({
      where: { organization_id: req.body.organizationId },
    });
    if (!organization) {
      res.status(400).send("Organization not found");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (!hashedPassword) {
      res.status(500).send("Failed to hash password");
      console.error("Failed to hash password");
      return;
    }

    await userRepository.insert({
      login_id: req.body.loginId,
      name: req.body.name,
      password: hashedPassword,
      permission: "user",
      organization: organization,
    });
    const userInDb = await userRepository.findOne({
      where: { login_id: req.body.loginId },
      relations: ["organization"],
    });

    if (!userInDb) {
      res.status(500).send("Failed to create user");
      console.error("Failed to create user");
      return;
    }

    const payload: jwtPayloadType = {
      user_id: userInDb.user_id,
      login_id: userInDb.login_id,
      permission: userInDb.permission,
      organization_id: userInDb.organization?.organization_id,
    };
    const jwtToken = jwtHelper.createToken(payload);
    res
      .status(200)
      .cookie("jwtToken", jwtToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ms("2d")),
      })
      .send("User created");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
  }
});

export default signupRouter;
