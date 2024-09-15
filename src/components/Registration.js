import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [availableSlots, setAvailableSlots] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/slot', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        if (response.ok && json.success) {
          setAvailableSlots(json.slots); // Ensure the key matches the backend response
        } else {
          setErrorMessage(json.message || 'Error fetching slots');
        }
      } catch (error) {
        setErrorMessage('Error fetching slots');
      }
    };

    fetchSlots();
  }, []);

  const handleProceed = async () => {
    if (availableSlots > 0) {
      try {
        const response = await fetch('http://localhost:5000/api/decrementSlot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        if (response.ok && json.success) {
          setAvailableSlots(json.slotsRemaining); // Update available slots after decrement
          navigate('/entry'); // Navigate to entry page after successful slot decrement
        } else {
          setErrorMessage(json.message || 'Error decrementing slot');
        }
      } catch (error) {
        setErrorMessage('Error connecting to server');
      }
    } else {
      setErrorMessage('No available slots');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <h2>Available Slots: {availableSlots}</h2>
        <button onClick={handleProceed} className="btn btn-primary">
          {availableSlots > 0 ? 'Proceed to Entry' : 'Slots Not Available'}
        </button>
      </div>
    </div>
  );
};

export default Registration;
