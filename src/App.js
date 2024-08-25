import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // To handle the filtering option

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(input);
      const result = await axios.post('https://bajaj-nphv.onrender.com/bfhl', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError(`Failed to process the data: ${err.message}`);
      setResponse(null);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to render filtered response based on the selected filter
  const renderFilteredResponse = () => {
    if (!response) return null;

    switch (filter) {
      case 'numbers':
        return <div>Numbers: {response.numbers.join(', ')}</div>;
      case 'alphabets':
        return <div>Alphabets: {response.alphabets.join(', ')}</div>;
      case 'highest_lowercase_alphabet':
        return <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</div>;
      default:
        return <pre>{JSON.stringify(response, null, 2)}</pre>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BFHL Data Processor</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder='Enter JSON data here, e.g., {"data": ["A", "C", "z"]}'
          />
          <button type="submit">Submit</button>
        </form>
        {response && (
          <>
            <select onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            <div>
              <h3>Filtered Response:</h3>
              {renderFilteredResponse()}
            </div>
          </>
        )}
        {error && (
          <div style={{ color: 'red' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
