import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetchCustomer } from './useFetchCustomer';
import { Customer } from '../../types/types';
import { fetchData } from '../../utils/fetchData/fetchData';

// Mock for fetch API
vi.mock('../../utils/fetchData/fetchData');

describe('useFetchCustomer', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should set loading to true initially and false after fetching data', async () => {
    const mockCustomer = {
      id: '1',
      name: 'John Doe',
      email: 'test@.com',
    };

    // Mock successful fetch
    vi.mocked(fetchData).mockResolvedValueOnce({
      customers: [mockCustomer],
    });

    const { result } = renderHook(() => useFetchCustomer('1'));

    // Initially, loading should be true
    expect(result.current.loading).toBeTruthy();

    // Wait for the fetch to complete
    await waitFor(() => !result.current.loading);

    // After fetch, loading should be false
    expect(result.current.loading).toBeFalsy();
    expect(result.current.customer).toEqual(mockCustomer);
    expect(result.current.error).toBeFalsy();
  });

  it('should set customer data after successful fetch', async () => {
    const mockCustomer: Customer = {
      id: '1',
      name: 'John Doe',
      email: 'test@.com',
    };

    // Mock successful fetch with customer data
    vi.mocked(fetchData).mockResolvedValue({
      customers: [mockCustomer],
    });

    const { result } = renderHook(() => useFetchCustomer('1'));

    await waitFor(() => !result.current.loading);

    expect(result.current.customer).toEqual(mockCustomer);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeFalsy();
  });

  it('should set error if customer is not found', async () => {
    // Mock successful fetch with no matching customer
    vi.mocked(fetchData).mockResolvedValueOnce({
      customers: [],
    });

    const { result } = renderHook(() => useFetchCustomer('999'));

    await waitFor(() => !result.current.loading);

    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBe('Customer not found');
  });
});
