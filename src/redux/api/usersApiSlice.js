import { apiSlice } from "./apiSlice";
import { setUser } from "../slices/userSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login user
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
    }),

    // Register user
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Logout user - typically handled by clearing local state,
    // but we can also notify the backend
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),

    // Refresh token
    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh-token",
        method: "POST",
      }),
    }),

    // Get user data
    getUserData: builder.query({
      query: () => "/users/me",
      providesTags: ["Users"],
      invalidatesTags: ["Links"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      },
    }),

    // Update user data with optimistic update
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "PATCH",
        body: userData,
      }),
      async onQueryStarted(update, { dispatch, queryFulfilled, getState }) {
        // Get current user data from the cache
        const currentUser = usersApiSlice.endpoints.getUserData.select()(
          getState()
        )?.data;

        // Merge current user with updates
        const mergedUpdate = {
          ...currentUser,
          ...update,
        };

        // Update Redux state optimistically
        dispatch(setUser(mergedUpdate));

        // Apply optimistic update with merged data
        const patchResult = dispatch(
          usersApiSlice.util.updateQueryData(
            "getUserData",
            undefined,
            (draft) => {
              Object.assign(draft, mergedUpdate);
            }
          )
        );

        try {
          const { data } = await queryFulfilled;
          // Update Redux state with server response
          dispatch(setUser(data));
        } catch {
          patchResult.undo();
          // Revert Redux state
          dispatch(setUser(currentUser));
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetUserDataQuery,
  useUpdateUserMutation, // Add this export
} = usersApiSlice;
