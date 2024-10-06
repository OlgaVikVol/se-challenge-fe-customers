import { useEffect, useState } from 'react';
import { Customer } from '../../types/types';
import { fetchData } from '../../utils/fetchData/fetchData';

/**
 * Custom hook to fetch a list of customers.
 *
 * @returns {Object} - Returns an object containing:
 *   - customers: The list of customers fetched from the server.
 *   - error: An error message if the fetch fails.
 *   - loading: A boolean indicating whether the data is still being loaded.
 */
export const useFetchCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const response = await fetchData<{ customers: Customer[] }>(
          'settings.json'
        );

        if (response?.customers instanceof Array) {
          setCustomers(response.customers);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);

          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, error, loading };
};
