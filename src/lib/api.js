import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flask-todo-cicd.onrender.com/api';
console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const todoAPI = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  createTodo: async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
  },
  updateTodo: async (id, updates) => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  },
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;


