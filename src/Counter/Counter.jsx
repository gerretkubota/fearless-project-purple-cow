import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Components';
import { useDebounce } from '../Hooks';

const URL = 'https://api.countapi.xyz';
const GET_HITS = `${URL}/get`;
const UPDATE_HITS = `${URL}/update`;

const Counter = ({ apiKey, amount = 1 }) => {
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [error, setError] = useState({ status: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [amountOfHits, setAmountOfHits] = useState(amount);
  const [hasClicked, setHasClicked] = useState(false);
  const debounceValue = useDebounce(hasClicked);

  const hitsEndpoint = async (endpoint) => {
    try {
      setLoading(true);

      if (error.status) {
        setError({ status: false, message: '' });
      }

      if (debounceValue) {
        setHasClicked(false);
      }

      const response = await fetch(endpoint);
      const result = await response.json();

      setNumberOfHits(result.value);
      setLoading(false);
    } catch (e) {
      console.error(e.error);
      setError({ status: true, message: e.error });
    }
  };

  const incrementHits = () => {
    hitsEndpoint(`${UPDATE_HITS}/${apiKey}?amount=${amountOfHits}`);
  };

  const handleHit = () => {
    if (hasClicked === false) {
      setHasClicked(true);
    }
  };

  useEffect(() => {
    if (apiKey.length) {
      hitsEndpoint(`${GET_HITS}/${apiKey}`);
    } else {
      console.error('Please provide an api key.');
      setError({ status: true, message: 'Please provide an api key.' });
    }
  }, []);

  useEffect(() => {
    if (debounceValue) {
      incrementHits();
    }
  }, [debounceValue]);

  return (
    <div>
      {!loading && (
        <div>
          <p>Current number of hits: {numberOfHits}</p>
          <Button content="Hit" onClick={handleHit} />
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error.status && <p>{error.message}</p>}
    </div>
  );
};

Counter.propTypes = {
  apiKey: PropTypes.string,
};

export default Counter;
