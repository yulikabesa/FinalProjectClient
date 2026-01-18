import axios, { AxiosError } from "axios";

class UserService {
  createUser = async (dataToSend: {
    name: string;
    email: string;
    personalNumber: string;
    password: string;
    isAdmin: boolean;
  }) => {
    const url = "http://localhost:3000/user/";
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
  login = async (dataToSend: { email: string; password: string }) => {
    const url = "http://localhost:3000/user/login";
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
  logout = async (token: string | null) => {
    const url = "http://localhost:3000/user/logout";
    try {
      const response = await axios.post(url, undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      console.log("Success! Status code:", response.status);
      console.log("response :", response);
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
  update = async (
    token: string | null,
    dataToSend: { name: string; email: string; personalNumber: string },
    url: string
  ) => {
    try {
      // Send the POST request using await
      const response = await axios.patch(url, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // This is the default, but explicitly shown here
        },
      });
      console.log("Success! Status code:", response.status);
      return response;
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error sending POST request:", axiosError.message);
        if (axiosError.response) {
          console.error("Status:", axiosError.response.status);
          console.error("Data:", axiosError.response.data);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
}

const userService = new UserService();

export default userService;
