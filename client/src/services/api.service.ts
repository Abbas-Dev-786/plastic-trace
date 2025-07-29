import instance from "@/config/api.config";

export const register = async (data: any) => {
  const res = await instance.post("/auth/register", data);
  return res.data;
};

export const getUser = async (address: any) => {
  const res = await instance.get(`/auth/users/${address}`);
  return res.data;
};
