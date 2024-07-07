import React, { useEffect, useState } from 'react';

export default function User() {
  const [usernames, setUsernames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/usernames');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        // Extract just the usernames from the objects
        const usernames = data.map(user => user.username);
        setUsernames(usernames); // Set the array of usernames
      } catch (error) {
        setError(`Error fetching API data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Usernames</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {usernames.map((username, index) => (
            <li key={index}>{username}</li>
          ))}
        </ul>
      )}
    </>
  );
}
