import { CorsOptions } from "cors";

if (process.env.NODE_ENV === "development") {
  var corsOptions: CorsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  };
} else if (process.env.NODE_ENV === "production") {
  var corsOptions: CorsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  };
} else {
  console.error("NODE_ENV is not set");
  var corsOptions: CorsOptions = {};
}

export default corsOptions;
