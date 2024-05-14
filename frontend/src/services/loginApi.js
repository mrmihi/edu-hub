import axios from "axios";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers :{
        "Content-Type": "application/json",
    },
  });
  
//To check if the token has expired
const isTokenExpired = () => {
    const token = Cookies.get("token");
    if (!token) {
      return true;
    }
    const tokenExpiration = new Date(
      JSON.parse(atob(token.split(".")[1])).exp * 1000
    );
    return tokenExpiration < new Date();
  };
  
  const autoLogout = () => {
    if (isTokenExpired()) {
      Cookies.remove("token");
      window.location.href = "/";
      enqueueSnackbar("Session expired. Please login again.", {
        variant: "error",
      });
    }
  };
  
  export const LoginApi = async (request) => {
    try {
      const response = await axiosInstance.post(`/api/v1/authentication/login`, request);
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 1 }); //expires in 1 day
        setInterval(autoLogout, 1000); //checking every second if the token has expired
        return { success: true, name: response.data.name };
      } else {
        return { success: false, error: response.data.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  
export const SignupApi = async (request) => {
    try {
      const response = await axiosInstance.post("api/v1/authentication/signup", request);
      if (response.status === 201) {
        return { success: true };
      } else {
        return { success: false, error: response.data.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  
export const LogoutApi = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.status === 200) {
        Cookies.remove("token");
        return { success: true };
      } else {
        return { success: false, error: response.data.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  export const ResetPasswordApi = async (request) => {
    try {
      const response = await axios.put("/reset", request);
      if (response.status === 200) {
        return { success: true };
      } else if (response.status === 204) {
        return { success: false, error: "User not found" , status: 204};
      }
      else {
        return { success: false, error: response.data.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };