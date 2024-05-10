import React, { useState } from "react";
import { Images } from "../../assets";
import { FcGoogle } from "react-icons/fc";
import { InputField } from "../../components/inputfield/InputField";
import { Link, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { signUpUser } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Google from "../../components/googlelogin/Google";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
  age: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const action = () => {
    navigate("/");
  };

  const toggleVisibility = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name Required!")
        .matches(/^[A-Za-z\s]+$/, "First Name Should Not Contain Numbers!")
        .max(15, "First Name Should Not Exceed 15 Characters!"),
      lastName: Yup.string()
        .required("Last Name Required!")
        .matches(/^[A-Za-z\s]+$/, "Last Name Should not Contain Numbers!")
        .max(15, "Last Name Should Not Exceed 15 Characters!"),
      email: Yup.string()
        .required("Email is Required!")
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Please Enter Valid Email!"
        ),
      password: Yup.string()
        .required("Password is Required!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character!"
        ),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password Must Match!")
        .required("Confirm Password is Required!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character!"
        ),
      age: Yup.number()
        .min(14, "Age Must be Minimum 14 Years!")
        .max(100, "Age Should Not Exceed 100 Years!")
        .required("Age Must be Required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(
          signUpUser({
            values: values,
            action: action,
          })
        );
      } catch (error) {
        console.error(error);
      }
      resetForm({});
    },
  });

  const handleSignIn = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex justify-between h-screen">
      <div className="w-[60%] lg:block hidden bg-[#F0E1FF] relative h-full">
        <img
          src={Images.animated}
          className="h-full w-full mt-[-7px] object-cover"
          alt=""
        />
        <div className="px-2 w-[100%] h-[100%] absolute top-0  flex justify-center  items-center left-[1%] ">
          <h1 className="font-[YAEZxXauVhw O] text-center w-[80%]  font-bold text-[20px] lg:px-40 ">
            ASK AND GET TRUSTFUL INFORMATION ON DEMAND!
          </h1>
        </div>
      </div>
      {/* left section */}
      <div className="lg:w-[40%] w-full overflow-hidden  bg-[#CEF0F9] flex justify-center flex-col px-8 items-center h-full py-8">
        <div className="bg-white lg:w-[80%] md:w-[70%] w-full flex flex-col rounded-lg shadow-lg">
          <div className="px-10 pt-5">
            <h4 className="font-[YACgEQNAr7w O] flex gap-2 items-center justify-center font-bold text-[18px]">
              SIGN UP
              <img src={Images.hand} className="h-6 w-6 object-contain" />
            </h4>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col px-10 py-5 mb-7 "
          >
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.firstName}
              </p>
            ) : null}

            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.lastName}
              </p>
            ) : null}

            <InputField
              label="Email"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.email}
              </p>
            ) : null}

            <InputField
              label="Age"
              type="number"
              name="age"
              value={formik.values.age}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (
                  inputValue === "" ||
                  (/^\d+$/.test(inputValue) && parseInt(inputValue, 10) >= 0)
                ) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.age}
              </p>
            ) : null}
            <div className="relative block">
              {showPassword.password ? (
                <BsEyeFill
                  className="absolute right-3 top-8 text-xl"
                  onClick={() => toggleVisibility("password")}
                />
              ) : (
                <BsEyeSlashFill
                  className="absolute right-3 top-8 text-xl"
                  onClick={() => toggleVisibility("password")}
                />
              )}
              <InputField
                label="Password"
                type={showPassword.password ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.password}
              </p>
            ) : null}
            <div className="relative block">
              {showPassword.confirmPassword ? (
                <BsEyeFill
                  className="absolute right-3 top-8 text-xl"
                  onClick={() => toggleVisibility("confirmPassword")}
                />
              ) : (
                <BsEyeSlashFill
                  className="absolute right-3 top-8 text-xl"
                  onClick={() => toggleVisibility("confirmPassword")}
                />
              )}
              <InputField
                label="Confirm Password"
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.confirmpassword}
              </p>
            ) : null}

            <button
              type="submit"
              className="btn-style px-6 rounded-md py-1 mt-3 flex justify-center mb-[2px] text-[white] font-bold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-white mr-2" />
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </button>

            <div className="flex items-center">
              <hr className="border-t border-gray-300 flex-grow" />
              <span className="px-4 text-gray-500">or</span>
              <hr className="border-t border-gray-300 flex-grow" />
            </div>

            <span>
              <Link
                onClick={(e) => handleSignIn(e)}
                className="flex justify-center items-center font-[YACgEQNAr7w O] text-color text-[12px] font-bold pb-[5px]"
              >
                Back to Sign in
              </Link>
            </span>

            <Google />
            {/* <button className="flex justify-center items-center border-[1px]  border-[#d2d5d8] outline-none p-1 rounded-md text-[14px] font-medium gap-2">
              <FcGoogle size={18} />
              Sign up with Google
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
