import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CustomerSettings } from './CustomerSettings';
import { Customer } from '../../shared/types/types';
import { MouseEventHandler } from 'react';

// Mock components
vi.mock('../../components/Loading/Loading', () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock('../../components/Error/ErrorMessage', () => ({
  ErrorMessage: ({ error }: { error: string }) => (
    <div data-testid="error-message">{error}</div>
  ),
}));

vi.mock('../../components/CustomerListItem/CustomerListItem', () => ({
  CustomerListItem: ({
    customer,
    onSelect,
  }: {
    customer: Customer;
    onSelect: MouseEventHandler<HTMLDivElement>;
  }) => (
    <div data-testid="customer-list-item" onClick={onSelect}>
      {customer.name}
    </div>
  ),
}));

describe('CustomerSettings', () => {
  const mockFetchCustomersData = (customersData: Customer[]) => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ customers: customersData }),
      })
    ) as unknown as typeof fetch;
  };

  beforeEach(() => {
    // Reset the fetch mock before each test
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore fetch after each test
    vi.restoreAllMocks();
  });

  it('should display the customer list when customers are found', async () => {
    const customersData = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];
    mockFetchCustomersData(customersData);

    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<CustomerSettings />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('customer-list-item')).toHaveLength(2);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  it('should display error message when fetch fails', async () => {
    // Mock a failed fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Failed to fetch customers')),
      })
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<CustomerSettings />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Failed to fetch data. Message: Failed to fetch data. Status: 500'
      );
    });
  });

  it('should display loading spinner while fetching data', () => {
    // Mock loading state
    global.fetch = vi.fn(
      () => new Promise(() => {})
    ) as unknown as typeof fetch;

    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<CustomerSettings />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
