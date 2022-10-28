import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const URL = 'https://api.countapi.xyz';

const Counter = ({ apiKey }) => {
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [error, setError] = useState({ status: false, message: '' });
  const [loading, setLoading] = useState(false);

  const getHits = async () => {
    try {
      setLoading(true);

      if (error.status) {
        setError({ status: false, message: '' });
      }

      const response = await fetch(`${URL}/get/${apiKey}`);
      const result = await response.json();

      setNumberOfHits(result.value);
      setLoading(false);
    } catch (e) {
      console.error(e.error);
      setError({ status: true, message: e.error });
    }
  };

  useEffect(() => {
    if (apiKey.length) {
      getHits();
    } else {
      console.error('Please provide an api key.');
      setError({ status: true, message: 'Please provide an api key.' });
    }
  }, []);

  return (
    <div>
      {!loading && <p>Current number of hits: {numberOfHits}</p>}
      {loading && <p>Loading...</p>}
      {error.status && <p>{error.message}</p>}
    </div>
  );
};

Counter.propTypes = {
  apiKey: PropTypes.string,
};

export default Counter;
