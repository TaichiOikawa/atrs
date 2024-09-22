import bcrypt from "bcrypt";

const main = async () => {
  console.log(await bcrypt.hash("password", 10));
};
main();
