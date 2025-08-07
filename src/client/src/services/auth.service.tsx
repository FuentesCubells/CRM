import axios from 'axios';

interface LoginCredentials {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const request = parseLoginRequest(credentials);
    const response = await axios.post('/api/auth/login', request);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const registerUser = async (credentials: LoginCredentials) => {
  try {
    const request = parseRegisterRequest(credentials);
    const response = await axios.post('/api/auth/register', request);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
}


function parseLoginRequest( credentials: LoginCredentials ) {
  return {
    username: credentials.email,
    password: credentials.password,
  };
}

function parseRegisterRequest( credentials: LoginCredentials ) {
  return {
    first_name: credentials.first_name,
    last_name: credentials.last_name,
    email: credentials.email,
    password: credentials.password,
  };
}