import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Entry() {
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds
  const navigate = useNavigate();

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/'); // Redirect to home if time runs out
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProceed = async () => {
    if (timeLeft > 0) {
      navigate('/exit'); // Navigate to exit if button is clicked before the timer expires
    }
  };

  return (
    <div className="text-center">
      <h2>Time Left: {formatTime(timeLeft)}</h2>
      <button onClick={handleProceed} className="btn btn-primary" disabled={timeLeft === 0}>
        Open the Door
      </button>
      {timeLeft === 0 && <p className="text-danger">Time is up! Redirecting to home...</p>}
    </div>
  );
}

export default Entry;
