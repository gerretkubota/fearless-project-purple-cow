import { useEffect, useState } from 'react';

/**
 *
 * @param {*} value
 * @param {number?} delay
 * @returns
 */
const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    let timer = null;

    if (value) {
      timer = setTimeout(() => setDebounceValue(value), delay);
    } else {
      setDebounceValue(value);
    }

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
