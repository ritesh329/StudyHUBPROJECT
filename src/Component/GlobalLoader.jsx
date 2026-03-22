import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
<div className="fixed inset-0  flex items-center justify-center z-50">
      
     <div className="w-14 h-14 border-8 border-red-800 border-t-blue-800 rounded-full animate-spin"></div>

    </div>
  );
};

export default GlobalLoader;