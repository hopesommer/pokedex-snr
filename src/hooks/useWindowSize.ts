import { useEffect, useState } from 'react'

type WindowSize = {
    width?: number,
    height?: number
}

export const useWindowSize =()  => {
    const [windowSize, setWindowSize] = useState<WindowSize>();
    const [isMobile, setIsMobile] = useState<Boolean>(false)
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                ...windowSize,
                width: window.screen.width,
                height: window.screen.height
            });
            setIsMobile(window.screen.width < 400)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return {
    isMobile,
    windowSize
  };
}