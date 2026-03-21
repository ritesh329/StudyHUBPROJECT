import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  // initial state (browser se)
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // jab internet ON ho
    const handleOnline = () => {
      setIsOnline(true);
    };

    // jab internet OFF ho
    const handleOffline = () => {
      setIsOnline(false);
    };

    // events listen karo
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // cleanup (important)
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;