import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/auth/authSlice";

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successGoogle = (response) => {
    const idToken = response?.tokenId;
    localStorage.setItem("access_token", idToken);
    const data = {
      idToken: localStorage.getItem("access_token"),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/auth/google-login`,
        data,
        config
      )
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        dispatch(setUser(response.data.user));
        navigate("/myaccount");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const failueGoogle = (error) => {
    console.log("<<<error>>", error);
  };

  useEffect(() => {
    localStorage.clear();
    function start() {
      gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "email",
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!localStorage.getItem("access_token")) {
      gapi.load("client:auth2", start);
    }
  }, []);

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Continue with Google"
        onSuccess={successGoogle}
        onFailure={failueGoogle}
        cookiePolicy={"single_host_origin"}
        className="google-login-button"
        autoLoad={false}
        disabled={false}
      />
    </>
  );
};

export default Google;
