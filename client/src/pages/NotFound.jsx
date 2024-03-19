import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      navigate('/');
    }
  }, [counter, navigate]);

  return (
    <div>
      <h1>404 - Not Found!</h1>
      <p>Redirecting you to the home page in {counter} seconds...</p>
    </div>
  );
}
