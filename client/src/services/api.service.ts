import instance from "@/config/api.config";

export const register = async (data: any) => {
  const res = await instance.post("/auth/register", data);
  return res.data;
};
