import React, { useState } from "react";
import { Images } from "../../assets";
import { useNavigate } from "react-router-dom";
import ConfirmPassword from "./ConfirmPassword";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Otp = () => {
  const navigate = useNavigate();
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otp, setOTP] = useState("");
  const emailId = useSelector((state) => state?.auth?.email);
  const { email } = emailId;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (otp.length !== 4) {
      toast.error("All Fields are Mendatory");
      return;
    }

    setIsLoading(true);

    let data = JSON.stringify({
      otp: otp,
      email: email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/auth/verify-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        toast.success("Account Verified");
        navigate("/confirmpassword");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setOTP("");
    }
  };

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
            <h1 className="font-[YAEZxXauVhw O] text-center w-[80%]  font-bold text-[20px] lg:px-28">
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
            {isOTPVerified ? (
              <ConfirmPassword />
            ) : (
              <>
                <div className="px-10 py-5">
                  <h4 className="font-[YACgEQNAr7w O] flex gap-2 items-center font-bold text-[18px]">
                    Please Enter your OTP{" "}
                    <img src={Images.hand} className="h-6 w-6 object-contain" />{" "}
                  </h4>

                  <p className="font-[YACgEQNAr7w O] text-[#9CABBA] text-[10px]">
                    Enter the information you entered while registering.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="flex flex-col px-10 py-5 mb-7 "
                >
                  <div className="otp-input">
                    <OTPInput
                      value={otp}
                      onChange={setOTP}
                      numInputs={4}
                      isInputSecure={false}
                      inputStyle={{
                        width: "47px",
                        height: "56px",
                        margin: "0 24px 0 0",
                        fontSize: "1rem",
                        borderRadius: "6px",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        outline: "none",
                        textAlign: "center",
                        color: "black",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        marginBottom: "32px",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-style px-6 rounded-md py-1 mb-6 flex justify-center text-white font-bold"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-white mr-2" />
                        Verifying OTP...
                      </div>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
