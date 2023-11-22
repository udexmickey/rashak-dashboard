import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', checkIsMobile);

    checkIsMobile();

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return { isMobile, setIsMobile };
};

export default useIsMobile;
