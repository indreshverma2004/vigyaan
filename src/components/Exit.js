import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Exit() {
  const [startTime, setStartTime] = useState(null);  // To store when user enters the page
  const [currentTime, setCurrentTime] = useState(null);  // For updating the timer
  const [cost, setCost] = useState(null);  // To store calculated cost
  const navigate = useNavigate();

  useEffect(() => {
    // When the component mounts (user navigates to the exit page)
    const start = new Date();  // Get the current time as start time
    setStartTime(start);

    // Update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Function to handle clicking on "Open the Gate"
  const handleProceed = async () => {
    if (startTime && currentTime) {
      const totalTimeMs = currentTime - startTime; // Total time in milliseconds
      const totalTimeHours = totalTimeMs / (1000 * 60 * 60); // Convert to hours

      // Calculate the cost based on (totalHours - 1) * 20
      const adjustedHours = Math.max(0, totalTimeHours - 1); // Make sure we don't get negative hours
      const calculatedCost = Math.floor(adjustedHours) * 20; // Only count whole hours

      setCost(calculatedCost); // Set the cost to display

      // Make API call to increase the available slots by 1
      try {
        const response = await fetch('http://localhost:5000/api/incrementSlot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        if (!response.ok || !json.success) {
          console.error("Failed to increment the slot count");
        }
      } catch (error) {
        console.error('Error incrementing slot:', error);
      }

      // After calculating the cost and incrementing the slot, navigate to the home page after a short delay
      setTimeout(() => {
        navigate('/');  // Navigate to home page after 2 seconds
      }, 2000);
    }
  };

  // Display the elapsed time in seconds
  const elapsedTime = startTime && currentTime ? Math.floor((currentTime - startTime) / 1000) : 0;

  return (
    <div className="text-center">
      <h2>Elapsed Time: {elapsedTime} seconds</h2>
      {cost !== null && <h3>Total Cost: ${cost}</h3>}
      <button onClick={handleProceed} className="btn btn-primary">
        {cost === null ? 'Open the Gate' : 'Returning to Home...'}
      </button>
    </div>
  );
}

export default Exit;
