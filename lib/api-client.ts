import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

type TokenResolver = () => Promise<string | null>;
let resolveToken: TokenResolver | null = null;

/**
 * Register a dynamic callback to fetch the Clerk JWT token.
 * This is called from the React Query/Clerk provider wrapper.
 */
export const registerTokenResolver = (resolver: TokenResolver) => {
  resolveToken = resolver;
};

// Request interceptor to attach the Bearer token
apiClient.interceptors.request.use(
  async (config) => {
    if (resolveToken) {
      try {
        const token = await resolveToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error resolving auth token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An error occurred';

    if (status === 401) {
      console.warn('Unauthorized request, redirecting to login...');
      if (typeof window !== 'undefined') {
        // Redirect to Clerk sign-in page
        window.location.href = '/auth/sign-in';
      }
    }

    // Keep error structure standard
    return Promise.reject({
      status,
      message,
      originalError: error,
    });
  }
);

export default apiClient;
