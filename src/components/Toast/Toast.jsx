import React from "react";

const Toast = ({ snackbar, setSnackbar }) => {
  const handleCloseSnackbar = () => {
    setSnackbar(false); // Inform the parent to hide the toast
  };

  return (
    <div>
      {snackbar && (
        <div
          className="absolute flex gap-3 top-10 right-10 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded"
          role="alert"
          onClick={handleCloseSnackbar}
        >
          <strong className="font-bold">
            Heads up!
          </strong>
          <span className="block sm:inline">
            Don't forget to add options for select
            labels in edit forms panel!
          </span>
          <svg
            className="fill-current h-6 w-6 text-blue-500 ml-4 cursor-pointer"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={handleCloseSnackbar}
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.196 7.349 14.849a1.2 1.2 0 1 1-1.697-1.697L8.196 10 5.652 7.349a1.2 1.2 0 1 1 1.697-1.697L10 8.196l2.651-3.543a1.2 1.2 0 1 1 1.697 1.697L11.804 10l2.544 2.651a1.2 1.2 0 0 1 0 1.698z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Toast;
