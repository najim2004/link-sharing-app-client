import { apiSlice } from "./apiSlice";

export const linksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLinks: builder.query({
      query: () => `/api/links`,
      transformResponse: (response) => response.links,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Links", id: _id })),
              { type: "Links", id: "LIST" },
            ]
          : [{ type: "Links", id: "LIST" }],
    }),

    getLinkById: builder.query({
      query: (linkId) => `/api/links/link/${linkId}`,
      providesTags: (result, error, linkId) => [{ type: "Links", id: linkId }],
    }),

    addUserLink: builder.mutation({
      query: (linkData) => ({
        url: "/api/links",
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
      query: ({ linkId, ...linkData }) => ({
        url: `/api/links/${linkId}`,
        method: "PUT",
        body: linkData,
      }),
      // Optimistic update
      async onQueryStarted(
        { linkId, userId, ...update },
        { dispatch, queryFulfilled }
      ) {
        // Update the link in getUserLinks cache optimistically
        const patchListResult = dispatch(
          linksApiSlice.util.updateQueryData(
            "getUserLinks",
            userId,
            (draft) => {
              const link = draft.find((item) => item._id === linkId);
              if (link) {
                Object.assign(link, update);
              }
            }
          )
        );

        // Also update the link in single link cache if it exists
        const patchDetailResult = dispatch(
          linksApiSlice.util.updateQueryData("getLinkById", linkId, (draft) => {
            Object.assign(draft, update);
          })
        );

        try {
          // Wait for the actual API response
          await queryFulfilled;
          // Success - the cache is already updated optimistically
        } catch {
          // If request fails, revert both optimistic updates
          patchListResult.undo();
          patchDetailResult.undo();
        }
      },
    }),

    deleteUserLink: builder.mutation({
      query: ({ linkId }) => ({
        url: `/api/links/${linkId}`,
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

export const {
  useGetUserLinksQuery,
  useGetLinkByIdQuery,
  useAddUserLinkMutation,
  useUpdateUserLinkMutation,
  useDeleteUserLinkMutation,
} = linksApiSlice;
