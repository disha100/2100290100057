import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNumberId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let apiUrl = '';

    switch (numberId) {
      case 'p':
        apiUrl = 'http://20.244.56.144/test/primes';
        break;
      case 'f':
        apiUrl = 'http://20.244.56.144/test/fibo';
        break;
      case 'e':
        apiUrl = 'http://20.244.56.144/test/even';
        break;
      case 'r':
        apiUrl = 'http://20.244.56.144/test/rand';
        break;
      default:
        setError('Enter Onyl "p", "f", "e", or "r".');
        setLoading(false);
        return;
    }

    try {
      const res = await axios.get(apiUrl);
      setResponse(res.data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator HTTP MicroService</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={numberId}
            onChange={handleInputChange}
            placeholder="Enter number ID (p, f, e, r)"
            required
          />
          <button type="submit">Calculate</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {response && (
          <div>
            <h2>Response</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;


