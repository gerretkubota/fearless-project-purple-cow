import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Components';
import { useDebounce, useApi } from '../Hooks';

const URL = 'https://api.countapi.xyz';
const GET_HITS = `${URL}/get`;
const UPDATE_HITS = `${URL}/update`;

const Counter = ({ apiKey, amount = 1 }) => {
  const [numberOfHits, setNumberOfHits] = useState(amount);
  const [amountOfHits, setAmountOfHits] = useState(amount);
  const [hasClicked, setHasClicked] = useState(false);

  const { loading, error, result, fetchApi, setError } = useApi();
  const debounceValue = useDebounce(hasClicked);

  const incrementHits = () => {
    fetchApi(`${UPDATE_HITS}/${apiKey}?amount=${amountOfHits}`);
  };

  const handleHit = () => {
    if (hasClicked === false) {
      setHasClicked(true);
    }
  };

  useEffect(() => {
    if (apiKey.length) {
      fetchApi(`${GET_HITS}/${apiKey}`);
    } else {
      console.error('Please provide an api key.');
      setError({ status: true, message: 'Please provide an api key.' });
    }
  }, []);

  useEffect(() => {
    if (result) {
      setNumberOfHits(result.value);
    }
  }, [result]);

  useEffect(() => {
    if (debounceValue) {
      incrementHits();
      setHasClicked(false);
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
