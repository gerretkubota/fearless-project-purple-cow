import { useState } from 'react';

/**
 *
 * @returns {error, setError, fetchApi, loading, result}
 * custom hook (resuable) for fetching apis and returning the response
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [result, setResult] = useState(null);

  const fetchApi = async (endpoint, options = {}) => {
    try {
      setLoading(true);

      if (error.status) {
        setError({ status: false, message: '' });
      }

      const response = await fetch(endpoint, options);
      const result = await response.json();

      setResult(result);
      setLoading(false);
    } catch (e) {
      console.error(e.error);
      setError({ status: true, message: e.error });
    }
  };

  return {
    error,
    setError,
    fetchApi,
    loading,
    result,
  };
};

export default useApi;
