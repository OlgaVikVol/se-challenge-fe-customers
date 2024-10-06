import { fetchData } from './fetchData';
import { describe, it, expect, vi } from 'vitest';

// Mock response helper function
const mockResponse = (status: boolean, responseData: Record<string, unknown>) => {
  return Promise.resolve({
    ok: status,
    json: () => Promise.resolve(responseData),
    status: status ? 200 : 404,
  } as Response);
};

describe('fetchData function', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test
  });

  it('fetches successfully data from an API', async () => {
    // Mocking fetch to return a successful response
    global.fetch = vi.fn().mockImplementation(() =>
      mockResponse(true, { yourData: 'mockedData' })
    );

    const result = await fetchData<{ yourData: string }>('endpoint');

    expect(result).toEqual({ yourData: 'mockedData' });
  });

  it('handles non-ok responses', async () => {
    // Mocking fetch to return a failed response (e.g., 404)
    global.fetch = vi.fn().mockImplementation(() =>
      mockResponse(false, { error: 'Mocked error message' })
    );

    await expect(fetchData('endpoint')).rejects.toThrowError(
      'Failed to fetch data. Status: 404'
    );
  });

  it('handles network issues', async () => {
    // Mocking fetch to throw a network error
    global.fetch = vi.fn().mockImplementation(() => Promise.reject(new Error('Network error')));

    await expect(fetchData('endpoint')).rejects.toThrowError(
      'Failed to fetch data. Message: Network error'
    );
  });
});
