const API_BASE_URL = "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}, type = "user") => {
  const token =
    type === "partner"
      ? localStorage.getItem("partnerToken")
      : localStorage.getItem("token");

  const headers = {
    ...(options.body instanceof FormData
      ? {} // ✅ let browser set content-type
      : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
