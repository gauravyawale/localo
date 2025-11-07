import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors can be added here for request/response handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    console.log("API Error:", message);
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default apiClient;
