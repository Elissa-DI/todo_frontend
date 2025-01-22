import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/todos";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Token ", token);
    
  return { Authorization: `${token}` };
};

export const fetchTodos = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });  
  return response.data.todos;
};

export const fetchTodo = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return response.data.todo;
};

export const createTodo = async (todo: { title: string; description: string; dueDate?: string }) => {
  const response = await axios.post(API_URL, todo, { headers: getAuthHeaders() });
  return response.data.todo;
};

export const updateTodo = async (id: string, todo: Partial<{ title: string; description: string; status: boolean; dueDate?: string }>) => {
  const response = await axios.put(`${API_URL}/${id}`, todo, { headers: getAuthHeaders() });
  return response.data.todo;
};

export const deleteTodo = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
