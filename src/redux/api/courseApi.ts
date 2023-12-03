import { baseApi } from "./baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCourse: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: () => ({
        url: "/course",
        method: "POST",
      }),
      invalidatesTags: ["course"],
    }),
    allCourse: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (arg: Record<string, any>) => ({
        url: "/course",
        method: "GET",
        params: arg,
      }),
      providesTags: ["course"],
    }),

    courseDetails: build.query({
      query: (id: string) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    likedCourse: build.mutation({
      query: (id) => ({
        url: `/course/like/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useAllCourseQuery,
  useCourseDetailsQuery,
  useLikedCourseMutation,
  useCreateCourseMutation,
} = courseApi;
