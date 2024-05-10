import React, { useState } from "react";
import { Images } from "../../assets";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../components/inputfield/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmResetPassword } from "../../store/auth/authSlice";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const ConfirmPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { loading } = useSelector((state) => state.auth);
  const emailId = useSelector((state) => state?.auth?.email);
  const { email } = emailId;

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
      password: Yup.string()
        .required("Password is Required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is Required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .oneOf([Yup.ref("password"), null], "Passwords Must Match"),
    }),
    onSubmit: (values, { resetForm }) => {
      const { password } = values;
      dispatch(
        confirmResetPassword({ email: email, password: password, action })
      )
        .then(() => {
          resetForm({});
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
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

          <div className="bg-white lg:w-[80%] md:w-[70%] w-full flex flex-col rounded-lg shadow-lg">
            <div className="px-10 py-5">
              <h4 className="font-[YACgEQNAr7w O] flex gap-2 items-center font-bold text-[18px]">
                Enter New Password{" "}
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
                  label="New Password"
                  type={showPassword.password ? "text" : "password"}
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
                  label="Confirm New Password"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-[red] font-[YACgEQNAr7w O] text-[10px]">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}

              <button
                type="submit"
                className="btn-style px-6 rounded-md py-2 mt-2 flex justify-center text-white font-bold"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-white mr-2" />
                    Changing Password...
                  </div>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
