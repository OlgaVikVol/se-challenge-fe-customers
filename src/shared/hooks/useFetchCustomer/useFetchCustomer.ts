import { useEffect, useState } from 'react';
import { Customer } from '../../types/types';
import { fetchData } from '../../utils/fetchData/fetchData';

/**
 * Custom hook to fetch a single customer by their ID.
 *
 * @param {string} id - The ID of the customer to fetch.
 * @returns {Object} - Returns an object containing:
 *   - customer: The fetched customer data or null if not found.
 *   - error: An error message if the fetch fails or if the customer is not found.
 *   - loading: A boolean indicating whether the data is still being loaded.
 */
export const useFetchCustomer = (id: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);

        const response = await fetchData<{ customers: Customer[] }>(
          'settings.json'
        );

        if (response?.customers instanceof Array) {
          const selectedCustomer = response.customers.find(
            (c: Customer) => c.id.toString() === id
          );

          if (selectedCustomer) {
            setCustomer(selectedCustomer);
          } else {
            setError('Customer not found');
          }
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
          setError(`Failed to fetch customer: ${e.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  return { customer, error, loading };
};
