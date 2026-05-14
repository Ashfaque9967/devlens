import { useState, useEffect, type ReactNode } from "react";
import { MobileBlocker } from "../MobileBlocker/MobileBlocker";

const MOBILE_MAX_WIDTH = 480;

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= MOBILE_MAX_WIDTH,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return <MobileBlocker />;
  }

  return <>{children}</>;
}
