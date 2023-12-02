import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: "/auth/sing-in",
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    registerUser: build.mutation({
      query: (RegData) => ({
        url: "/auth/sing-up",
        method: "POST",
        data: RegData,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
} = authApi;
