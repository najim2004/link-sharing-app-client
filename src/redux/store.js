import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// Export API slices for easier imports throughout the app
export { 
  linksApiSlice 
} from './api/linksApiSlice';

export {
  platformsApiSlice
} from './api/platformsApiSlice';

export {
  profilesApiSlice
} from './api/profilesApiSlice';

export {
  usersApiSlice
} from './api/usersApiSlice';
