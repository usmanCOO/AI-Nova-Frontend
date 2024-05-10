import React, { useEffect, useState } from "react";
import { AudioRecorder as AudioRecord } from "react-audio-voice-recorder";
import { Images } from "../../assets";
import { ApprovalPopup, LinksPopup } from "./Popup";
import Loading from "react-loading";
import useAudioApi from "./useAudioApi";

const VoiceRecorder = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [showMic, setShowMic] = useState(true);
  const {
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
  } = useAudioApi();

  const stopRecording = (blob) => {
    const url = URL.createObjectURL(blob);
    uploadAudio(url);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && queryString?.trim().length !== 0) {
      fetchLinks();
    }
  };

  useEffect(() => {
    setShowMic(!queryString?.trim().length);
  }, [queryString]);

  useEffect(() => {
    const handleClick = () => {
      setShowSearch(true);
    };

    const discardImgElement = document.querySelector(
      'img[title="Discard Recording"]'
    );

    if (discardImgElement) {
      discardImgElement.addEventListener("click", handleClick);
    }

    return () => {
      if (discardImgElement) {
        discardImgElement.removeEventListener("click", handleClick);
      }
    };
  }, [showSearch]);

  useEffect(() => {
    const handleMicClick = () => {
      setShowSearch(false);
    };

    const micElement = document.querySelector('img[title="Start recording"]');

    if (micElement) {
      micElement.addEventListener("click", handleMicClick);
    }

    return () => {
      if (micElement) {
        micElement.removeEventListener("click", handleMicClick);
      }
    };
  }, [showMic]);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center h-[100vh]">
          <div className="App flex justify-center">
            <div className="text-center flex justify-center items-center">
              {loading ? (
                <Loading type="spin" color="#747474" />
              ) : (
                <>
                  {openPopup ? (
                    <div>
                      <ApprovalPopup
                        setOpenPopup={setOpenPopup}
                        queryString={queryString}
                        setQueryString={setQueryString}
                        fetchLinks={fetchLinks}
                        setShowSearch={setShowSearch}
                      />
                    </div>
                  ) : (
                    <>
                      {showMic ? (
                        <div className="h-0">
                          <AudioRecord
                            classes="relative z-10"
                            onRecordingComplete={stopRecording}
                            audioTrackConstraints={{
                              noiseSuppression: true,
                              echoCancellation: true,
                            }}
                            downloadOnSavePress={false}
                            downloadFileExtension="mp3"
                          />

                          <img
                            src={Images.mic}
                            alt=""
                            className="-translate-y-8"
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {showSearch || responseLinksPopup ? (
          <div className="absolute flex justify-center bottom-10 w-full">
            <input
              type="text"
              name="search"
              placeholder="type in..."
              className="border-[1px] border-[#d2d5d8]  outline-none p-[0.5rem] rounded-md lg:w-[40%] md:w-[60%] w-[90%] placeholder-[black]"
              onChange={(e) => {
                const inputValue = e.target.value.replace(
                  /[^a-zA-Z0-9\s]/g,
                  ""
                );
                setQueryString(inputValue);
              }}
              value={queryString}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute lg:right-[30%] md:right-[20%] right-[5%] top-[.5px] font-extrabold">
              <button
                className="btn-style cursor-pointer text-white px-5 py-2 ease-in-out duration-300"
                style={{ borderRadius: "0 6px 6px 0" }}
                onClick={fetchLinks}
                disabled={queryString?.trim().length === 0}
              >
                Search
              </button>
            </span>
          </div>
        ) : null}
      </div>
      {responseLinksPopup ? (
        <LinksPopup
          responseLinks={responseLinks}
          responseLinksPopup={responseLinksPopup}
          setResponseLinksPopup={setResponseLinksPopup}
          storeLinksHandler={storeLinksHandler}
          setShowSearch={setShowSearch}
          setQueryString={setQueryString}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default VoiceRecorder;
