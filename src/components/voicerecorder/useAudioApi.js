import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAudioApi = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [responseLinks, setResponseLinks] = useState([]);
  const [responseLinksPopup, setResponseLinksPopup] = useState(false);

  const uploadAudio = (url) => {
    setLoading(true);
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const formData = new FormData();
        formData.append("file", blob, "uploaded_audio.mp3");
        axios
          .post(
            `${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/users/upload-audio`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then((res) => {
            setOpenPopup(true);
            setQueryString(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.status === 401) {
              toast.error("Token has expired!");
              navigate("/");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  const fetchLinks = () => {
    setLoading(true);
    setOpenPopup(false);
    const data = {
      query: queryString,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/users/fetch-links`,
        data,
        config
      )
      .then((response) => {
        setResponseLinks(response?.data?.links);
        setResponseLinksPopup(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const storeLinksHandler = (link) => {
    setLoading(true);
    const data = {
      link: link,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/users/store-link`,
        data,
        config
      )
      .then((response) => {
        toast.success(response.data.message);
        window.open(link, "_blank");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    openPopup,
    setOpenPopup,
    queryString,
    setQueryString,
    responseLinks,
    responseLinksPopup,
    setResponseLinksPopup,
    uploadAudio,
    fetchLinks,
    storeLinksHandler,
  };
};

export default useAudioApi;
