import { request } from "../lib/request";

const API_URL = process.env.API_URL;
interface ResponseState {
  error: string | null;
  data: any;
}

export const register = async (data: any) => {  
  return await request(`${API_URL}/auth/register`, "POST", data);
};
