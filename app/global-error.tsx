'use client';

export default function GlobalError({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <html>
      <body className="flex flex-col justify-center items-center fixed inset-0 bg-gray-100">
        <div className="max-w-lg w-full bg-white border shadow-md rounded-lg p-6 text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error while loading the page. Please
            try again, or go back to the homepage for more free resources.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            {error.message} {/* Show the error message (optional) */}
          </p>
          <button
            className="bg-blue-600 text-white uppercase font-semibold py-2 px-4 rounded-sm hover:bg-blue-700 transition-colors"
            onClick={handleReset}
          >
            Try Again
          </button>
          <a
            href="/"
            className="mt-4 block text-sm text-blue-500 hover:underline"
          >
            Go Back to Homepage
          </a>
        </div>
      </body>
    </html>
  );
}
