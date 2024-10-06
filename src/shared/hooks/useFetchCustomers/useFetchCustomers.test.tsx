import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetchCustomers } from './useFetchCustomers';
import { fetchData } from '../../utils/fetchData/fetchData';

// Mock for fetch API
vi.mock('../../utils/fetchData/fetchData');

describe('useFetchCustomers', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should set loading to true initially and false after fetching data', async () => {
    const mockData = {
      customers: [{ id: '1', name: 'John Doe', email: 'test@.com' }],
    };

    // Mock successful fetch
    vi.mocked(fetchData).mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchCustomers());

    // Initially, loading should be true
    expect(result.current.loading).toBeTruthy();

    // Wait for the fetch to complete
    await waitFor(() => !result.current.loading);

    // After fetch, loading should be false
    expect(result.current.loading).toBeFalsy();
    expect(result.current.customers).toEqual(mockData.customers);
    expect(result.current.error).toBeFalsy();
  });

  it('should set customers data after successful fetch', async () => {
    const mockData = {
      customers: [{ id: '1', name: 'John Doe', email: 'test@.com' }],
    };

    vi.mocked(fetchData).mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchCustomers());

    await waitFor(() => !result.current.loading);

    expect(result.current.customers).toEqual(mockData.customers);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
  });

  it('should set error if fetch fails', async () => {
    const errorMessage = 'Failed to fetch customers.';
    vi.mocked(fetchData).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useFetchCustomers());

    expect(result.current.loading).toBeTruthy();

    await waitFor(() => !result.current.loading);

    expect(result.current.customers).toEqual([]);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toEqual(errorMessage);
  });
});
