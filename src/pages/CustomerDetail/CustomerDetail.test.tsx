import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CustomerDetail } from './CustomerDetail';
import { Customer } from '../../shared/types/types';

// Mock components
vi.mock('../../components/Loading/Loading', () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock('../../components/Error/ErrorMessage', () => ({
  ErrorMessage: ({ error }: { error: string }) => (
    <div data-testid="error-message">{error}</div>
  ),
}));

vi.mock('../../components/CustomerForm/CustomerForm', () => ({
  CustomerForm: ({ customer }: { customer: Customer }) => (
    <div data-testid="customer-form">Customer Form for {customer.name}</div>
  ),
}));

describe('CustomerDetail', () => {
  const mockFetchCustomerData = (customerData: Customer[]) => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ customers: customerData }),
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

  it('should display customer form when customer is found', async () => {
    const customerData: Customer[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ];
    mockFetchCustomerData(customerData);

    render(
      <MemoryRouter initialEntries={['/customer/1']}>
        <Routes>
          <Route path="/customer/:id" element={<CustomerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('customer-form')).toBeInTheDocument();
      expect(screen.getByTestId('customer-form')).toHaveTextContent(
        'Customer Form for John Doe'
      );
    });
  });
});
