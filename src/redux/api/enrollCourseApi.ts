import { baseApi } from "./baseApi";

export const enrolledCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    enrolledCourse: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: () => ({
        url: "/enrolled-course",
        method: "POST",
      }),
      invalidatesTags: ["enrollCourse"],
    }),
    myEnrolledCourse: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (arg: Record<string, any>) => ({
        url: "/enrolled-course",
        method: "GET",
        params: arg,
      }),
      providesTags: ["enrollCourse"],
    }),

    enrolledCourseDetails: build.query({
      query: (id: string) => ({
        url: `/enrolled-course/${id}`,
        method: "GET",
      }),
      providesTags: ["enrollCourse"],
    }),
    updatedCourse: build.mutation({
      query: (data) => ({
        url: `/enrolled-course/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["enrollCourse"],
    }),
    deleteEnrolledCourse: build.mutation({
      query: (id) => ({
        url: `/enrolled-course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["enrollCourse"],
    }),
  }),
});

export const {
  useEnrolledCourseMutation,
  useDeleteEnrolledCourseMutation,
  useUpdatedCourseMutation,
  useEnrolledCourseDetailsQuery,
  useMyEnrolledCourseQuery,
} = enrolledCourseApi;
