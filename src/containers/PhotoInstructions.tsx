import React, { useState } from "react";

const PhotoInstructions = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      <button
        type="button"
        className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={toggleModal}
        style={{
          backgroundColor: "red",
          height: "45px",
          borderRadius: "2px",
        }}
      >
        ? Photo Instructions
      </button>

      <div
        className={`modal fade fixed top-0 left-0 w-full h-full ${
          !openModal && "hidden"
        } outline-none overflow-x-hidden overflow-y-auto`}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: 99999999999999 }}
      >
        <div
          className="modal-dialog relative w-auto pointer-events-none"
          style={{ maxWidth: "600px", margin: "50px auto" }}
        >
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium text-gray-800"
                id="exampleModalLabel"
              >
                Photo Instructions
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ fontSize: 24 }}
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>
            <div className="modal-body relative p-2">
              <img
                src="/photo-instructions.jpeg"
                width="100%"
                alt="Not found"
              />
            </div>
            {/* <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
              >
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoInstructions;
