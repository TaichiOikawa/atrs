import * as express from "express";

const logoutRouter: express.Router = express.Router();

logoutRouter.post("/", async (req, res, next) => {
  console.debug("Logout request received");
  try {
    res.status(200).clearCookie("jwtToken").send("Logout successful");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
});

export default logoutRouter;
