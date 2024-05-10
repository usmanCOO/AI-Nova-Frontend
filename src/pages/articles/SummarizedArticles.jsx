import React from "react";
import { SideBar } from "../../components/sideBar/SideBar";
import VoiceRecorder from "../../components/voicerecorder/VoiceRecorder";
import ProtectedRoutes from "../../components/protectedroutes/ProtectedRoutes";

const SummarizedArticles = () => {
  return (
    <div className="lg:flex block bg-[#EEF7FC] overflow-hidden">
      <SideBar />

      <div className="bg-image lg:w-[80%] w-full h-full relative">
        <VoiceRecorder />

        {/* <div className="lg:w-[20%] h-[35%] absolute lg:top-[40%] md:top-[45rem] top-[32.5rem] right-6 ">
          <a
            href="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              My Summarized Articles
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a>
        </div> */}
      </div>
    </div>
  );
};
export default ProtectedRoutes(SummarizedArticles);
