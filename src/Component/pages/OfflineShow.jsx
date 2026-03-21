import { useEffect, useState } from "react";

const OfflinePage = () => {
  const [dots, setDots] = useState("");

  // simple animated dots (loading effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

      {/* Loader Spinner */}
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        404
      </h1>
      <p>sever not found </p>

      {/* Subtitle */}
      <p className="text-gray-400 text-center mb-4">
        Please check your connection{dots}
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition duration-300 shadow-lg"
      >
        Retry
      </button>
    </div>
  );
};

export default OfflinePage;