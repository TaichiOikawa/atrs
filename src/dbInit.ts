import { AppDataSource } from "../data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data source initialized");
  })
  .catch((error) => {
    console.error("Data source initialization failed", error);
  });
