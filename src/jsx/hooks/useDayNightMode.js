import { useState, useEffect } from 'react';

const useDayNightMode = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  const getDayNightColors = () => {
    return currentHour >= 6 && currentHour < 23.40 ? 'day' : 'night';
  };

  return { getDayNightColors };
};

export default useDayNightMode;