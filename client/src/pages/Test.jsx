import React, { useEffect, useState } from 'react';

export default function Test() {
  const [apiMessage, setApiMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setApiMessage(data.message);
      } catch (error) {
        setError(`Error fetching API data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Test</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        apiMessage && <span style={{ marginLeft: '10px' }}>{`"${apiMessage}"`}</span>
      )}
    </>
  );
}
