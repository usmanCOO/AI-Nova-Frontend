import React, { useState } from "react";
import { Images } from "../../assets";
import { InputField } from "../../components/inputfield/InputField";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { forgetPassword } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const defaultValues = {
  email: "",
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const action = () => {
    navigate("/otp");
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required")
        .email("Please Enter Valid Email"),
      // .test(
      //   "email-exists",
      //   "This email is not registered in our system.",
      //   async function (value) {
      //     return false;
      //   }
      // ),
    }),
    onSubmit: (values, { resetForm }) => {
      const email = values;
      dispatch(forgetPassword({ values: values, action }));
      setTimeout(() => {
        resetForm({});
      }, 3000);
    },
  });

  return (
    <div className="flex justify-between h-screen">
      <div className="w-[60%] lg:block hidden bg-[#F0E1FF] relative h-full">
        <img
          src={Images.animated}
          className="h-full w-full mt-[-7px] object-cover"
          alt=""
        />
        <div className="px-2 w-[100%] h-[100%] absolute top-0  flex justify-center  items-center left-[1%]">
          <h1 className="font-[YAEZxXauVhw O] text-center w-[80%]  font-bold text-[20px] lg:px-40">
            ASK AND GET TRUSTFUL INFORMATION ON DEMAND!
          </h1>
        </div>
      </div>
      {/* left section */}
      <div className="lg:w-[40%] w-full  bg-[#CEF0F9] flex justify-center flex-col px-8 items-center h-full ">
        <h3 className="font-[YAEZxXauVhw O] font-bold text-[18px] text-center px-12 mb-3">
          WELCOME TO NOVA, AI RESEARCH ASSISTANT
        </h3>

        <div className="bg-white lg:w-[80%] md:w-[70%] w-full flex flex-col">
          <div className="bg-[white] px-10 py-5">
            <h4 className="font-[YACgEQNAr7w O] flex gap-2 items-center font-bold text-[18px]">
              Please Enter your Mail{" "}
              <img src={Images.hand} className="h-6 w-6 object-contain" />{" "}
            </h4>

            <p className="font-[YACgEQNAr7w O] text-[#9CABBA] text-[10px]">
              Enter the information you entered while registering.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col px-10 py-5 mb-7 "
          >
            <InputField
              label="Email"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.email}
              </p>
            ) : null}

            <div className="flex justify-end py-2">
              <Link
                to="/"
                className="text-sm font-[YACgEQNAr7w O] text-color font-medium flex"
              >
                Back to Sign In?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-style px-6 rounded-md py-1 mb-6 flex justify-center text-white font-bold"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-white mr-2" />
                  Verifying Email...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
