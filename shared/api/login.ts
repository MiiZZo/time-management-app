import { request } from "../lib/request";

const API_URL = process.env.API_URL;

export const login = async (data: any): Promise<any | string> => {
  return await request(`${API_URL}/auth/register`, "POST", data);
};
