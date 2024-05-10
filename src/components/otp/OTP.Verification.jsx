import { useState } from "react";

const OTPVerification = ({ otp, handleBackspace, handleChange, setOtpNum }) => {
  return (
    <div className="w-full">
      <div className="bg-white h-64 py-3 rounded text-center">
        <h1 className="text-2xl font-bold">OTP Verification</h1>
        <div className="flex flex-col mt-4">
          <span>Enter the OTP you received at</span>
          <span className="font-bold">+91 ******876</span>
        </div>

        <div
          id="otp"
          className="flex flex-row justify-center text-center px-2 mt-5 "
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              className="m-2 border h-10 w-10 text-center form-control rounded border-[black]"
              type="text"
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, setOtpNum(e.target.value))}
              onKeyDown={(e) => handleBackspace(index, e)}
            />
          ))}
        </div>

        <div className="flex justify-center text-center mt-5">
          <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
            <span className="font-bold">Resend OTP</span>
            <i className="bx bx-caret-right ml-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
