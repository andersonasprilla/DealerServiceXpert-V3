import { useState, useEffect } from 'react';

const useDataFetching = (fetchFunction, dependencies = [], condition = true) => {
  // State for storing fetched data, loading state, and errors
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Skip fetching if condition is false
      if (!condition) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        // Call the provided fetch function
        const response = await fetchFunction();
        // Update data state with fetched results
        setData(response.results || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...dependencies, condition]);  // Re-run effect when dependencies or condition changes

  return { data, isLoading, error };
};

export default useDataFetching;