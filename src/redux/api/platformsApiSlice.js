import { apiSlice } from "./apiSlice";

export const platformsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET - Fetch all platforms
    getPlatforms: builder.query({
      query: () => "/platforms",
      transformResponse: (response) => response.platforms,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Platforms", id })),
              { type: "Platforms", id: "LIST" },
            ]
          : [{ type: "Platforms", id: "LIST" }],
    }),

    // GET - Fetch single platform by ID
    getPlatformById: builder.query({
      query: (id) => `/platforms/${id}`,
      providesTags: (result, error, id) => [{ type: "Platforms", id }],
    }),

    // POST - Create a new platform with optimistic update
    createPlatform: builder.mutation({
      query: (platformData) => ({
        url: "/platforms",
        method: "POST",
        body: platformData,
      }),
      invalidatesTags: [{ type: "Platforms", id: "LIST" }],
      // Optimistic update
      async onQueryStarted(newPlatform, { dispatch, queryFulfilled }) {
        // Get a unique temporary ID
        const tempId = Date.now().toString();

        // Add platform to cache optimistically with tempId
        const patchResult = dispatch(
          platformsApiSlice.util.updateQueryData(
            "getPlatforms",
            undefined,
            (draft) => {
              // Create optimistic platform with tempId and other data
              const optimisticPlatform = {
                ...newPlatform,
                id: tempId,
              };
              draft.push(optimisticPlatform);
            }
          )
        );

        try {
          // Wait for the actual response
          const { data: createdPlatform } = await queryFulfilled;

          // Update the temporary entry with the actual data from the server
          dispatch(
            platformsApiSlice.util.updateQueryData(
              "getPlatforms",
              undefined,
              (draft) => {
                const tempPlatformIndex = draft.findIndex(
                  (platform) => platform.id === tempId
                );
                if (tempPlatformIndex !== -1) {
                  draft[tempPlatformIndex] = createdPlatform;
                }
              }
            )
          );

          // Also update individual platform cache
          dispatch(
            platformsApiSlice.util.upsertQueryData(
              "getPlatformById",
              createdPlatform.id,
              createdPlatform
            )
          );
        } catch {
          // If request fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),

    // PUT - Update an existing platform with optimistic update
    updatePlatform: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/platforms/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Platforms", id }],
      // Optimistic update
      async onQueryStarted({ id, ...update }, { dispatch, queryFulfilled }) {
        // Update the platform in getPlatforms cache optimistically
        const patchListResult = dispatch(
          platformsApiSlice.util.updateQueryData(
            "getPlatforms",
            undefined,
            (draft) => {
              const platform = draft.find((item) => item.id === id);
              if (platform) {
                Object.assign(platform, update);
              }
            }
          )
        );

        // Also update the platform in single platform cache
        const patchDetailResult = dispatch(
          platformsApiSlice.util.updateQueryData(
            "getPlatformById",
            id,
            (draft) => {
              Object.assign(draft, update);
            }
          )
        );

        try {
          // Wait for the actual API response
          await queryFulfilled;
        } catch {
          // If request fails, revert both optimistic updates
          patchListResult.undo();
          patchDetailResult.undo();
        }
      },
    }),

    // DELETE - Delete a platform with optimistic update
    deletePlatform: builder.mutation({
      query: (id) => ({
        url: `/platforms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Platforms", id }],
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Save the original platform before removing it
        let originalPlatform;

        // Remove the platform from cache optimistically
        const patchResult = dispatch(
          platformsApiSlice.util.updateQueryData(
            "getPlatforms",
            undefined,
            (draft) => {
              const index = draft.findIndex((platform) => platform.id === id);
              if (index !== -1) {
                // Store original for restoration if needed
                originalPlatform = draft[index];
                // Remove from cache
                draft.splice(index, 1);
              }
            }
          )
        );

        try {
          // Wait for the API call to complete
          await queryFulfilled;

          // Success - no need to do anything else
        } catch {
          // If request fails, revert the optimistic update
          patchResult.undo();

          // If we have the original platform data, we can also restore the detail view
          if (originalPlatform) {
            dispatch(
              platformsApiSlice.util.upsertQueryData(
                "getPlatformById",
                id,
                originalPlatform
              )
            );
          }
        }
      },
    }),
  }),
});

export const {
  useGetPlatformsQuery,
  useGetPlatformByIdQuery,
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
  useDeletePlatformMutation,
} = platformsApiSlice;
