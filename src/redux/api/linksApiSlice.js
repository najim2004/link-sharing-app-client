import { apiSlice } from "./apiSlice";

export const linksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLinks: builder.query({
      query: () => `/links`,
      transformResponse: (response) => response.links,
      // Add keepUnusedDataFor option to keep cache longer
      keepUnusedDataFor: 300, // Keep data for 5 minutes
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Links", id: _id })),
              { type: "Links", id: "LIST" },
            ]
          : [{ type: "Links", id: "LIST" }],
    }),

    getLinkById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),

    addUserLink: builder.mutation({
      query: (linkData) => ({
        url: "/links",
        method: "POST",
        body: linkData,
      }),
      // Optimistic update
      async onQueryStarted(
        { userId, ...newLink },
        { dispatch, queryFulfilled }
      ) {
        // Generate temporary ID for optimistic update
        const tempId = Date.now().toString();

        // Add link to cache optimistically
        const patchResult = dispatch(
          linksApiSlice.util.updateQueryData(
            "getUserLinks",
            userId,
            (draft) => {
              draft.push({
                _id: tempId,
                ...newLink,
                userId,
              });
            }
          )
        );

        try {
          // Wait for the actual response
          const { data } = await queryFulfilled;

          // Update the temporary entry with the actual data from the server
          dispatch(
            linksApiSlice.util.updateQueryData(
              "getUserLinks",
              userId,
              (draft) => {
                const tempLinkIndex = draft.findIndex(
                  (link) => link._id === tempId
                );
                if (tempLinkIndex !== -1) {
                  // Replace temp link with the real one from server
                  draft[tempLinkIndex] = data.link;
                }
              }
            )
          );

          // Also update individual link cache if needed
          dispatch(
            linksApiSlice.util.upsertQueryData(
              "getLinkById",
              data.link._id,
              data.link
            )
          );
        } catch {
          // If request fails, revert the optimistic update
          patchResult.undo();
        }
      },
    }),

    updateUserLink: builder.mutation({
      query: (links) => ({
        url: `/links`,
        method: "PATCH",
        body: links,
      }),
      async onQueryStarted(links, { dispatch, queryFulfilled }) {
        // Store original links for rollback
        const originalLinks = {};

        // Create optimistic updates for each link
        const patchResults = links.map((link) => {
          return dispatch(
            linksApiSlice.util.updateQueryData(
              "getUserLinks",
              undefined,
              (draft) => {
                const existingLink = draft.find(
                  (item) => item._id === link._id
                );
                if (existingLink) {
                  originalLinks[link._id] = { ...existingLink };
                  Object.assign(existingLink, link);
                }
              }
            )
          );
        });

        try {
          const { data } = await queryFulfilled;

          // Update successful - update cache with server response
          if (data?.failedIds?.length) {
            // Revert updates for failed IDs only
            data.failedIds.forEach((failedId) => {
              if (originalLinks[failedId]) {
                dispatch(
                  linksApiSlice.util.updateQueryData(
                    "getUserLinks",
                    undefined,
                    (draft) => {
                      const linkToRevert = draft.find(
                        (item) => item._id === failedId
                      );
                      if (linkToRevert) {
                        Object.assign(linkToRevert, originalLinks[failedId]);
                      }
                    }
                  )
                );
              }
            });
          }
        } catch {
          // Revert all optimistic updates on error
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
      invalidatesTags: (result) =>
        result?.success ? [{ type: "Links", id: "LIST" }] : [],
    }),

    deleteUserLink: builder.mutation({
      query: (linkId) => ({
        url: `/links/${linkId}`,
        method: "DELETE",
      }),
      // Optimistic update
      async onQueryStarted({ linkId, userId }, { dispatch, queryFulfilled }) {
        // Save the original link before removing it
        let originalLink;

        // Remove the link from cache optimistically
        const patchResult = dispatch(
          linksApiSlice.util.updateQueryData(
            "getUserLinks",
            userId,
            (draft) => {
              const index = draft.findIndex((link) => link._id === linkId);
              if (index !== -1) {
                // Store original for restoration if needed
                originalLink = draft[index];
                // Remove from cache
                draft.splice(index, 1);
              }
            }
          )
        );

        // Also remove from individual link cache
        dispatch(
          linksApiSlice.util.invalidateTags([{ type: "Links", id: linkId }])
        );

        try {
          // Wait for the API call to complete
          await queryFulfilled;
          // Success - no need to do anything else
        } catch {
          // If request fails, revert the optimistic update
          patchResult.undo();

          // If we have the original link data, we can also restore the detail view
          if (originalLink) {
            dispatch(
              linksApiSlice.util.upsertQueryData(
                "getLinkById",
                linkId,
                originalLink
              )
            );
          }
        }
      },
    }),
  }),
});

// Add refetchOnMount and refetchOnReconnect options when using the hook
export const useOptimizedUserLinksQuery = () => {
  return useGetUserLinksQuery(undefined, {
    refetchOnMountOrArgChange: false, // Don't refetch on component mount
    refetchOnReconnect: false, // Don't refetch on reconnection
  });
};

export const {
  useGetUserLinksQuery,
  useGetLinkByIdQuery,
  useAddUserLinkMutation,
  useUpdateUserLinkMutation,
  useDeleteUserLinkMutation,
} = linksApiSlice;
