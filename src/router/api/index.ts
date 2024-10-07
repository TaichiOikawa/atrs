import Router from "express-promise-router";
import activityRouter from "./activity";
import organizationRouter from "./organization";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  console.debug("GET /api");
  res.send("API root");
});

apiRouter.use("/activity", activityRouter);
apiRouter.use("/organization", organizationRouter);

export default apiRouter;
