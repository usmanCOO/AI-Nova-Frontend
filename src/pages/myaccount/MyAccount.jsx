import React, { useState } from "react";
import { Images } from "../../assets";
import { SideBar } from "../../components/sideBar/SideBar";
import { TbSearch } from "react-icons/tb";
import VoiceRecorder from "../../components/voicerecorder/VoiceRecorder";
import ProtectedRoutes from "../../components/protectedroutes/ProtectedRoutes";
import axios from "axios";

const MyAccount = () => {
  return (
    <div className="lg:flex block bg-[#EEF7FC]  overflow-hidden">
      <SideBar />

      <div className="bg-image lg:w-[80%] w-full h-screen relative">
        <VoiceRecorder />
      </div>
    </div>
  );
};

export default ProtectedRoutes(MyAccount);
