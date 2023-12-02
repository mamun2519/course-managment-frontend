import userReducer from "./slice/userSlice";
export const reducer = {
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
