export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await fetch("http://localhost:8000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to register");
    }
  
    return response.json();
  };
  
  export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
  
    return response.json();
  };
  