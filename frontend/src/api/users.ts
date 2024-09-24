import axios from "axios";

export const getUsers = async () => {
  console.log("GET /api/organization/:organizationId/users");
  const organization = sessionStorage.getItem("organizationId");
  if (!organization) {
    throw new Error("Organization not found");
  }
  const res = await axios.get(`/api/organization/${organization}/users`);
  return res.data;
};
