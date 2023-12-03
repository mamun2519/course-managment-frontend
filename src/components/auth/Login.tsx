import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { LoginSchema } from "../../schema/user";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slice/userSlice";
import { storeUserInfo } from "../../services/user";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const [userLogin] = useUserLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    // Handle form submission logic here

    try {
      const res = await userLogin(data).unwrap();
      console.log(res);
      console.log(res.user);
      if (res?.accessToken) {
        navigate("/");
        // TODO USE TOST HERE
        dispatch(
          setUser({
            userId: res?.user?.id,
            email: res?.user?.email,
          })
        );
      }

      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(err?.data);
      console.log(err);
    }
  };

  return (
    <div className=" h-screen flex  justify-center items-center max-w-7xl mx-auto px-4 lg:px-0">
      <div className="lg:w-[450px] h-[450px] border rounded-2xl shadow p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center flex justify-center">
            <div>
              <p className="text-2xl uppercase">Login Now</p>
              {errorMessage && (
                <div className="bg-red-500 h-12 rounded mt-2 flex  items-center px-4">
                  <p className="text-white">{errorMessage}</p>
                </div>
              )}
              <div className="h-2 bg-red-500 w-96 mt-1 flex justify-center"></div>
            </div>
          </div>
          <div className="mt-5">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter Your Email"
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-3">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Password"
                  placeholder="Enter Your Password"
                  error={!!errors.password}
                  helperText={errors.password?.message as string}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-4">
            <div className="w-full h-10 bg-red-500 text-white flex justify-center items-center">
              <button className="w-full" type="submit">
                Login
              </button>
            </div>
            <p className="text-end mt-1 text-blue-600">Forget Password</p>
          </div>

          <div className="mt-5 text-center">
            <p>
              Are You New?{" "}
              <Link to="/register" className="text-blue-700">
                Please Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
