import { useNavigate, useRouteError } from "react-router";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 px-6">
      <div className="text-center max-w-lg">
        {/* Status Code */}
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">
          {error?.status || "404"}
        </h1>

        {/* Status Text */}
        <h2 className="text-2xl font-semibold text-gray-100 mb-2">
          {error?.statusText || "Page Not Found"}
        </h2>

        {/* Error Message */}
        {error?.data && (
          <p className="text-gray-400 mb-8 leading-relaxed">
            {typeof error.data === "string"
              ? error.data
              : "Something went wrong, please try again later."}
          </p>
        )}
x
        {/* CTA Button */}
        <button
          onClick={goBackHandler}
          className="bg-indigo-600  cursor-pointer hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          Go Back to Home
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-600 opacity-10 blur-3xl rounded-full"></div>
    </div>
  );
};
