import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const request = parseRequest(credentials);
    const response = await axios.post('/api/auth/login', request);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};


function parseRequest( credentials: LoginCredentials ) {
  return {
    username: credentials.email,
    password: credentials.password,
  };
}