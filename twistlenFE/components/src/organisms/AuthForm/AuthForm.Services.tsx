import axios, { AxiosError } from "axios";
import { rootUrl } from "@/constants/endPoints";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJiOGFlMDVjLTdlOWYtNGQ0ZS1iNjY3LWUwYTk1MTExODlmZSIsImVtYWlsIjoicGRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJwYXR0YW5haWswOTgiLCJpYXQiOjE3NDE3NjQ0ODcsImV4cCI6MTc0MTc2NTM4N30.aNCgHg4egOhvZ81qFh4VIpkps-bnrO5WWY-qCp-NfJY";

// Define an interface for the API response
interface LoginResponse {
  success?: boolean;
  message?: string;
  status?: number;
  token?: string;
  [key: string]: any; // Additional fields (if any)
}

// Function to make a login request
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
        }
      }
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Handles API errors and returns a structured response
const handleApiError = (error: AxiosError): LoginResponse => {
  if (error.response) {
    console.error(
      `API Error: ${error.response.status} - ${error.response.statusText}`
    );
    return {
      success: false,
      message: error.response.data?.message || "Server responded with an error",
      status: error.response.status,
    };
  } else if (error.request) {
    console.error("API Error: No response received from server");
    return {
      success: false,
      message: "No response from server. Please try again later.",
      status: 503,
    };
  } else {
    console.error("Unexpected Error:", error.message);
    return {
      success: false,
      message:
        "Something went wrong. Please check your connection and try again.",
      status: 500,
    };
  }
};
