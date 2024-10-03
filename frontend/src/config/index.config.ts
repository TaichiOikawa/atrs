if (process.env.NODE_ENV === "development") {
  var apiBaseUrl = "http://localhost:3000/";
} else if (process.env.NODE_ENV === "production") {
  var apiBaseUrl = "/";
} else {
  console.error("NODE_ENV is not set");
  var apiBaseUrl = "";
}

export default apiBaseUrl;
