import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get the base URL from your environment variables or hardcode it
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create our base API instance
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get token from state
      const token = getState().user?.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'Links', 'Platforms', 'Profiles'],
  endpoints: () => ({}),
});
