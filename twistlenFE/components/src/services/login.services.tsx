import axios, { AxiosError } from "axios";
import { rootUrl } from "@/constants/endPoints";

interface LoginResponse {
  success?: boolean;
  message?: string;
  status?: number;
  token?: string;
  [key: string]: any;
}

export const loginUser = async (
  email: string,
  password: string,
  userType: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${rootUrl}/Prod/login`,
      { email, password, usertype: userType },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleLoginError(error as AxiosError);
  }
};

const handleLoginError = (error: AxiosError): LoginResponse => {
  if (error.response) {
    console.error(
      `Login Error: ${error.response.status} - ${error.response.statusText}`
    );
    return {
      success: false,
      message: error.response.data?.message || "Invalid credentials",
      status: error.response.status,
    };
  } else if (error.request) {
    console.error("Login Error: No response received from server");
    return {
      success: false,
      message: "Unable to connect to server. Please try again.",
      status: 503,
    };
  } else {
    console.error("Unexpected Login Error:", error.message);
    return {
      success: false,
      message: "Login failed. Please check your connection.",
      status: 500,
    };
  }
};