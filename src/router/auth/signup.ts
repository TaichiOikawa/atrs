import * as bcrypt from "bcrypt";
import * as express from "express";
import { AppDataSource } from "../../../data-source";
import { Organization } from "../../entity/Organization";
import { Status, StatusEnum } from "../../entity/Status";
import { PermissionEnum, User } from "../../entity/User";
import { jwtHelper } from "../../modules/jwtHelper";

const signupRouter: express.Router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const organizationRepository = AppDataSource.getRepository(Organization);
const statusRepository = AppDataSource.getRepository(Status);

signupRouter.post(
  "/",
  async (req, res, next) => {
    await jwtHelper.apiVerifyToken(req, res, next);
  },
  async (req, res, next) => {
    try {
      if (res.locals.userInfo.permission === PermissionEnum.ADMIN) {
        if (!req.body.loginId || !req.body.name || !req.body.organizationId) {
          res.status(400).send("Invalid request");
          return;
        }
      } else {
        if (
          !req.body.loginId ||
          !req.body.password ||
          !req.body.name ||
          !req.body.organizationId
        ) {
          res.status(400).send("Invalid request");
          return;
        }
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

      if (res.locals.userInfo.permission === PermissionEnum.ADMIN) {
        await userRepository.insert({
          login_id: req.body.loginId,
          name: req.body.name,
          permission: PermissionEnum.UNREGISTERED,
          organization: organization,
        });
      } else {
        var hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (!hashedPassword) {
          res.status(500).send("Failed to hash password");
          console.error("Failed to hash password");
          return;
        }

        await userRepository.insert({
          login_id: req.body.loginId,
          name: req.body.name,
          password: hashedPassword,
          permission: PermissionEnum.USER,
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

        await statusRepository.insert({
          user_id: userInDb.user_id,
          status: StatusEnum.LEAVE,
        });
      }

      res.status(200).send("User created");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
      res.status(500).send("Failed to create user");
    }
  }
);

signupRouter.post("/unregistered", async (req, res, next) => {
  try {
    if (!req.body.loginId || !req.body.password || !req.body.name) {
      res.status(400).send("Invalid request");
      return;
    }

    const user = await userRepository.findOne({
      where: { login_id: req.body.loginId },
    });

    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    if (user.permission !== PermissionEnum.UNREGISTERED) {
      res.status(401).send("The user is already registered");
      return;
    }

    if (req.body.name !== user.name) {
      res.status(401).send("Invalid user name");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (!hashedPassword) {
      res.status(500).send("Failed to hash password");
      console.error("Failed to hash password");
      return;
    }

    await userRepository.update(
      {
        login_id: req.body.loginId,
      },
      {
        password: hashedPassword,
        permission: PermissionEnum.USER,
      }
    );

    const userInDb = await userRepository.findOne({
      where: { login_id: req.body.loginId },
      relations: ["organization"],
    });

    if (!userInDb) {
      res.status(500).send("Failed to update user");
      console.error("Failed to update user");
      return;
    }

    await statusRepository.save({
      user_id: userInDb.user_id,
      status: StatusEnum.LEAVE,
    });

    res.status(200).send("User Updated");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    }
    res.status(500).send("Failed to update user");
  }
});

export default signupRouter;
