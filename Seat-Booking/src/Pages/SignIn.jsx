import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import isEmailValidator from "validator/lib/isEmail";
import axios from "axios";
import { message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/InitialSlice";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Mail is required")
      .test(
        "is-valid",
        (message) => `${message.path} is invalid`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new yup.ValidationError("Invalid value")
      ),
    password: yup.string().required("password is required"),
  })
  .required();

const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signIn",
        formData
      );
      if (response.status != 200) {
        setError(response.data.message);
        return;
      }
      if (response.status == 200) {
        dispatch(setCurrentUser(true));
        reset();
        navigate("/book");
        message.success("user created Successfully");
      }
    } catch (error) {
      // Handle unexpected errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        // Handle unexpected errors
        console.error(error);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  drop-shadow-md lg:min-h-[550px]">
          <div>
            <h1 className="text-xl lg:text-[30px] font-bold leading-tight tracking-tight text-black md:text-2xl lg:px-5 lg:pt-5 lg:my-2 lg:mx-2 rounded-md drop-shadow-lg ">
              SignIn
            </h1>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    "
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors && (
                  <div className="text-red-500 text-[10px]">
                    {errors?.email?.message}
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-[10px]">{error}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("password")}
                />
                {errors && (
                  <div className="text-red-500 text-[10px]">
                    {errors?.password?.message}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-3 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 text-[10px]"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-[10px] font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>

              <div className="flex flex-col justify-between items-center gap-5">
                <button
                  type="submit"
                  className="lg:mt-10 w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center bg-white drop-shadow-md lg:font-bold lg:text-[16px] "
                >
                  Sign in
                </button>

                <button
                  className="flex w-full gap-3 justify-center border  py-2 rounded-md  items-center  border-black bg-white mb-4"
                  type="button"
                >
                  <span className="icon-[devicon--google]">
                    <FcGoogle size={25} />
                  </span>
                  <span>Continue with Google</span>
                </button>
              </div>

              <p className="text-[10px] font-light text-black">
                Don&apos;t Have an account ?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-[12px] text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
