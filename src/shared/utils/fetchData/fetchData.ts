import { BASE_URL } from '../../consts/api';

/**
 * Fetches data from a specified API endpoint and returns the parsed JSON response.
 * 
 * @template T - The expected type of the data being fetched.
 * 
 * @param {string} endpoint - The API endpoint (relative to the base URL) from which to fetch data.
 * @returns {Promise<T | undefined>} - A promise that resolves with the parsed data of type `T`, or `undefined` if an error occurs.
 * 
 * @throws {Error} - Throws an error if the network request fails or if the response status is not OK (non-2xx).
 */
export const fetchData = async <T>(
  endpoint: string
): Promise<T | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    if (response.ok) {
      const data: T = await response.json();

      return data;
    } else {
      // Handle non-ok responses, e.g., throw an error or return a specific value
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      // Catch any other errors (e.g., network issues)
      throw new Error(`Failed to fetch data. Message: ${e.message}`);
    }
  }
};
