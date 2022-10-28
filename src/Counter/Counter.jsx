import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Components';
import { useDebounce, useApi } from '../Hooks';
import './styles.css';

const URL = 'https://api.countapi.xyz';
const GET_HITS = `${URL}/get`;
const UPDATE_HITS = `${URL}/update`;

const Counter = ({ apiKey, amount = 1 }) => {
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [amountOfHits, setAmountOfHits] = useState(amount);
  const [hasClicked, setHasClicked] = useState(false);
  // custom hooks
  const { loading, error, result, fetchApi, setError } = useApi();
  const debounceValue = useDebounce(hasClicked);

  // hanlder for incrementing counter
  const incrementHits = () => {
    fetchApi(`${UPDATE_HITS}/${apiKey}?amount=${amountOfHits}`);
  };

  // onClick handler to distinguish if button has been clicked
  const handleHit = () => {
    if (hasClicked === false) {
      setHasClicked(true);
    }
  };

  // to fetch existing counter value on initial render
  useEffect(() => {
    if (apiKey.length) {
      fetchApi(`${GET_HITS}/${apiKey}`);
    } else {
      console.error('Please provide an api key.');
      setError({ status: true, message: 'Please provide an api key.' });
    }
  }, []);

  // update counter value after fetch call is complete
  useEffect(() => {
    if (result) {
      setNumberOfHits(result.value);
    }
  }, [result]);

  // only fetch when it has been clicked 'once'
  // activates 'debouncer'
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
          <p>
            Current number of hits:{' '}
            <span className="numberOfHits">{numberOfHits}</span>
          </p>
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
  amount: PropTypes.number,
};

export default Counter;
