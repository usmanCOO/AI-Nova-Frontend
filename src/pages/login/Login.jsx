import React, { useState, useEffect } from "react";
import { Images } from "../../assets";
import { InputField } from "../../components/inputfield/InputField";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Google from "../../components/googlelogin/Google";
import { signInUser } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const defaultValues = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);

  const action = () => {
    navigate("/myaccount");
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required!")
        .email("Please Enter Valid Email!")
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
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(
        signInUser({
          values: values,
          action,
        })
      );
      resetForm({});
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const parsaeToken = JSON.parse(token);
        navigate("/myaccount");
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="flex justify-between h-screen">
      <div className="w-[60%] lg:block hidden bg-[#F0E1FF] relative h-full">
        <img
          src={Images.animated}
          className="h-full w-full mt-[-7px] object-cover"
          alt=""
        />
        <div className="px-2 w-[100%] h-[100%] absolute top-0  flex justify-center  items-center">
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

        <div className="bg-white lg:w-[80%] md:w-[70%] w-full flex flex-col rounded-lg shadow-lg">
          <div className="px-10 py-5">
            <h4 className="font-[YACgEQNAr7w O] flex gap-2 items-center font-bold text-[18px]">
              Hey, hello{" "}
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
            <div className="relative block">
              {showPassword ? (
                <BsEyeFill
                  className="absolute right-3 top-8 text-xl"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <BsEyeSlashFill
                  className="absolute right-3 top-8 text-xl"
                  onClick={() => setShowPassword(true)}
                />
              )}
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                {formik.errors.password}
              </p>
            ) : null}

            <div className="flex justify-end py-2">
              {/* <div className="flex gap-2">
                <input type="checkbox" name="checkbox" />
                <span className="text-sm font-[YACgEQNAr7w O]">
                  Remember me
                </span>
              </div> */}

              <Link
                to="/password"
                className="text-sm font-[YACgEQNAr7w O] text-color font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-style px-6 rounded-md py-1 mb-6 flex justify-center text-[white] font-[YACgEQNAr7w O] font-bold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-white mr-2" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            <div className="flex items-center mb-6">
              <hr className="border-t border-gray-300 flex-grow" />
              <span className="px-4 text-gray-500">or</span>
              <hr className="border-t border-gray-300 flex-grow" />
            </div>

            <Google />
            <div className="flex font-[YACgEQNAr7w O] text-[#9CABBA] text-[13px] justify-center gap-2 pt-3">
              <p>Don't have an account?</p>
              <span className="font-[YACgEQNAr7w O] text-color text-[13px] font-bold">
                <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
