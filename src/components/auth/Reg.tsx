import { FormLabel, TextField } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRegisterUserMutation } from "../../redux/api/authApi";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { RegSchema } from "../../schema/user";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slice/userSlice";
import { storeUserInfo } from "../../services/user";

const Reg = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [registerUser] = useRegisterUserMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    if (data.available) {
      data.available = true;
    } else {
      data.available = false;
    }
    try {
      const res = await registerUser(data).unwrap();
      if (res.accessToken) {
        toast("Login Successfully");
        navigate("/");
        dispatch(
          setUser({
            userId: res?.user?._id,
            email: res?.user?.email,
          })
        );
      }
      storeUserInfo({ accessToken: res?.accessToken });
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error?.data);
      console.log(error);
    }
  };

  return (
    <div className=" h-screen max-w-7xl mx-auto flex justify-center items-center lg:px-0 px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" w-[450px] h-[630px] border rounded-2xl shadow p-5">
          <div className="text-center flex justify-center">
            <div>
              <p className="text-2xl uppercase">Register Now</p>
              {errorMessage && (
                <div className="bg-red-500 h-12 rounded mt-2 flex  items-center px-4">
                  <p className="text-white">{errorMessage}</p>
                </div>
              )}
              <div className="h-2 bg-red-500 w-96 mt-1 flex justify-center"></div>
            </div>
          </div>
          <div className="">
            <div className="mt-5">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="first Name"
                    placeholder="Enter Your Password"
                    error={!!errors.name}
                    helperText={errors.name?.message as string}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-3">
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
            <div className=" w-full h-10 bg-red-500 text-white flex justify-center items-center">
              <button className="w-full" type="submit">
                {" "}
                Register
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <FormLabel component="legend">
              Already Register?
              <Link to="/login" className="text-blue-700">
                Please login
              </Link>
            </FormLabel>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Reg;
