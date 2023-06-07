import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postSignIn } from "../../redux/Reducers/userReducer";
import { AppDispatch } from "../../redux/configStore";
import {
  CURRENT_USER,
  getStoreJSON,
  setStoreJSON,
  USER_LOGIN,
} from "../../utils/setting";
import { loginRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { UserSignIn } from "../../utils/Type/TypeUser";
import { FcGoogle } from "react-icons/fc";

type Props = {};

function LoginNew({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { number } = useParams();
  const schema = object({
    email: string().required("Tài khoản không được để trống"),
    password: string().required("Mật khẩu không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignIn>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    await dispatch(postSignIn(values));
    let user_login = {
      email: values.email,
      password: values.password,
    };
    // let currentUser = await axios.post(loginRoute, user_login);
    // await setStoreJSON(CURRENT_USER, currentUser.data.content);
    let userLogin = await getStoreJSON(USER_LOGIN);
    if (userLogin) {
      Number(number) > 0 ? navigate(-`${Number(number)}`) : navigate(`/`);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "2%",
          padding: "9px 12px",
        }}
        onClick={() => {
          navigate("/");
        }}
        className="text-lg cursor-pointer transition-all hover:-translate-y-2 text-white font-medium rounded-full bg-primary"
      >
        Trang chủ
      </div>
      <div className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGhvdGVsJTIwYm9va2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>
            <div className="mt-6">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password </label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>
            </div>
            <hr className="my-6 border-gray-300 w-full" />
            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <FcGoogle />
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>
            <p className="mt-8">
              Need an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default memo(LoginNew);
