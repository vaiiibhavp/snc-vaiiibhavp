import { useState, useEffect } from 'react';

function useCurrentDateTime() {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const updateFormattedTime = () => {
      const currentTime = new Date();
      const dateString = currentTime.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setFormattedTime(`${dateString} : ${timeString}`);
    };

    updateFormattedTime(); // Initial update
    const intervalId = setInterval(updateFormattedTime, 1000); // Update every second

    // Cleanup function to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return formattedTime;
}

export default useCurrentDateTime;