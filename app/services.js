import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const photoGallery = createApi({
  reducerPath: "photoGallery",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.unsplash.com/",
  }),
  endpoints: (builder) => ({
    // photos
    editorialImages: builder.query({
      query: (page) => ({
        url: `photos?page=${page}&per_page=30&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),

    photoDetail: builder.query({
      query: (id, page) => ({
        url: `photos/${id}?page=${page}&per_page=30&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),

    // users
    usersProfile: builder.query({
      query: (id) => ({
        url: `users/${id}?client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    usersPhotos: builder.query({
      query: ({ id, page }) => ({
        url: `users/${id}/photos?page=${page}&per_page=30&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    usersLikedPhotos: builder.query({
      query: ({ id, page }) => ({
        url: `users/${id}/likes?page=${page}&per_page=30&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    usersCollection: builder.query({
      query: ({ id, page }) => ({
        url: `users/${id}/collections?page=${page}&per_page=30&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),

    // search
    searchPhotos: builder.query({
      query: ({ searched, page }) => ({
        url: `search/photos?page=${page}&per_page=30&query=${searched}&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    searchCollections: builder.query({
      query: ({ searched, page }) => ({
        url: `search/collections?page=${page}&per_page=30&query=${searched}&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    searchUsers: builder.query({
      query: ({ searched, page }) => ({
        url: `search/users?page=${page}&per_page=30&query=${searched}&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),

    // collections
    collectionDetails: builder.query({
      query: (id) => ({
        url: `collections/${id}?client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    collectionPhotos: builder.query({
      query: ({ id, page }) => ({
        url: `collections/${id}/photos?page=${page}&per_page=30&client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    collectionRelatedCollection: builder.query({
      query: (id) => ({
        url: `collections/${id}/related?client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
    // Post details
    PostDetail: builder.query({
      query: (id) => ({
        url: `photos/${id}?client_id=kf_cmNioNgIVPYizoIyCvhh5x41uEJGedZgIihK5bng`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useEditorialImagesQuery,

  usePhotoDetailQuery,
  useSearchPhotosQuery,
  useSearchCollectionsQuery,
  useSearchUsersQuery,
  useUsersProfileQuery,
  useUsersPhotosQuery,
  useUsersLikedPhotosQuery,
  useUsersCollectionQuery,
  useCollectionDetailsQuery,
  useCollectionRelatedCollectionQuery,
  useCollectionPhotosQuery,
  usePostDetailQuery,
} = photoGallery;
