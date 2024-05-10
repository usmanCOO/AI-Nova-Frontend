import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Images } from "../../assets";
import Avatar from "react-avatar-edit";

const ProfileImage = () => {
  const [profilePicture, setProfilePicture] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [profileImgSrc, setProfileImgSrc] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [imageSize, setImageSize] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClose = () => {
    setProfileImgSrc("");
  };

  const onCrop = (profileImgSrc) => {
    setProfileImgSrc(profileImgSrc);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 2097152) {
      setImageSize(true);
      elem.target.value = "";
    } else if (elem.target.files[0].size < 2097152) {
      setImageSize(false);
    }
  };
  const handleClickOpen = () => {
    console.log("hello");
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="relative">
        <Modal isOpen={openModal} onRequestClose={handleClose}>
          <Avatar
            width={width < 500 ? width - 50 : 285}
            height={250}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            label={"Upload Picture By Clicking the text (max 2mb)"}
            labelStyle={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          />

          <button
            onClick={() => {
              setProfilePicture(true);
              setOpenModal(false);
            }}
            className="px-[39px] py-2 rounded-lg mt-1 bg-[#D3B1FF] text-[12px] font-bold"
          >
            Save
          </button>
        </Modal>
        {profilePicture && profileImgSrc ? (
          <img
            className="rounded-full"
            src={profileImgSrc}
            alt=""
            width={50}
            height={70}
          />
        ) : (
          <div className="rounded-[50%] h-16 w-15 object-contain mt-7 pb-2">
            <img
              src={Images.avatar}
              className="rounded-[50%] h-16 w-15 object-contain mt-7 pb-2"
              alt=""
              onClick={handleClickOpen}
            />
          </div>
        )}
      </div>
      <div>
        <p className="text-red-700 text-center">
          {imageSize ? "Image size should be maximum 2mb" : ""}
        </p>
      </div>
    </>
  );
};

export default ProfileImage;
