import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const ApprovalPopup = ({
  setOpenPopup,
  queryString,
  fetchLinks,
  setShowSearch,
  setQueryString,
}) => {
  return (
    <>
      <div className="z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <button
              type="button"
              className="absolute top-3 right-2.5 text-[#E00000] bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center close-icon"
              data-modal-hide="popup-modal"
              onClick={() => {
                setOpenPopup(false);
                setShowSearch(true);
                setQueryString("");
              }}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center w-[300px]">
              <h3 className="my-5 break-all text-lg font-normal text-gray-500 dark:text-gray-400">
                {queryString}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white btn-style font-bold rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={fetchLinks}
              >
                Approved
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="bg-white rounded-lg border text-sm font-bold px-5 py-2.5"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
                onClick={() => {
                  setOpenPopup(false);
                  setShowSearch(true);
                  setQueryString("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const LinksPopup = ({
  responseLinks,
  setResponseLinksPopup,
  storeLinksHandler,
  setShowSearch,
  setQueryString,
}) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="inset-0 absolute top-0 !right-[20px] flex items-center">
        <div className="w-full max-w-[300px] h-[325px] overflow-y-auto ml-auto">
          <div className="pt-12 pb-10 px-5 relative bg-[#E6E8FA] rounded-lg shadow-lg">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-[#E00000] bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center close-icon"
              data-modal-hide="popup-modal"
              onClick={() => {
                setResponseLinksPopup(false);
                setShowSearch(true);
                setQueryString("");
              }}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="text-left">
              {location.pathname === "/articles" ? (
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  My Summarized Articles
                </h5>
              ) : (
                <h1 className="font-bold">Hey {user.firstName}!</h1>
              )}
              {location.pathname === "/articles" ? (
                <p className="font-normal text-gray-700 pb-2 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              ) : (
                <p className="pb-2">
                  Here are some of the relevant articles and research papers for
                  you essay! Let me know if you need more. It was also sent to
                  your email address.
                </p>
              )}
              <ul className="mb-2 last:mb-0">
                {responseLinks?.map((link, index) => (
                  <li
                    key={index}
                    className="text-gray-700 break-words text-left cursor-pointer mb-2 last:mb-0"
                    onClick={() => storeLinksHandler(link)}
                  >
                    {index + 1}. {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
