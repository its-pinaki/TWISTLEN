import axios, { AxiosError } from "axios";
import { rootUrl } from "@/constants/endPoints";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJiOGFlMDVjLTdlOWYtNGQ0ZS1iNjY3LWUwYTk1MTExODlmZSIsImVtYWlsIjoicGRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJwYXR0YW5haWswOTgiLCJpYXQiOjE3NDE3NjQ0ODcsImV4cCI6MTc0MTc2NTM4N30.aNCgHg4egOhvZ81qFh4VIpkps-bnrO5WWY-qCp-NfJY";

interface SignupResponse {
  success?: boolean;
  message?: string;
  status?: number;
  token?: string;
  [key: string]: any;
}

export const signupUser = async (
  username: string,
  email: string,
  password: string,
  userType: string
): Promise<SignupResponse> => {
  try {
    const response = await axios.post<SignupResponse>(
      `${rootUrl}/Prod/register`,
      { username, email, password, usertype: userType },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleSignupError(error as AxiosError);
  }
};

const handleSignupError = (error: AxiosError): SignupResponse => {
  if (error.response) {
    console.error(
      `Signup Error: ${error.response.status} - ${error.response.statusText}`
    );
    return {
      success: false,
      message: error.response.data?.message || "Registration failed",
      status: error.response.status,
    };
  } else if (error.request) {
    console.error("Signup Error: No response received from server");
    return {
      success: false,
      message: "Unable to connect to registration service",
      status: 503,
    };
  } else {
    console.error("Unexpected Signup Error:", error.message);
    return {
      success: false,
      message: "Registration failed due to unexpected error",
      status: 500,
    };
  }
};