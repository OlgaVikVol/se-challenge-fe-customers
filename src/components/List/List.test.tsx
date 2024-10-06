import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { List } from './List';
import { Customer } from '../../shared/types/types';

// Mock data for the test
const customers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
];

// Function to render a list item
const renderItem = (customer: Customer) => (
  <li key={customer.id} data-testid="customer-item">
    {customer.name} - {customer.email}
  </li>
);

describe('CustomerList', () => {
  it('should render a list of customers correctly', () => {
    render(<List items={customers} renderItem={renderItem} />);

    // Check the number of rendered list items
    const customerItems = screen.getAllByTestId('customer-item');
    expect(customerItems).toHaveLength(customers.length);

    // Check the content of each list item
    customers.forEach((customer, index) => {
      expect(customerItems[index]).toHaveTextContent(customer.name);
      expect(customerItems[index]).toHaveTextContent(customer.email);
    });
  });

  it('should render an empty list when no customers are provided', () => {
    render(<List items={[]} renderItem={renderItem} />);
    const customerItems = screen.queryAllByTestId('customer-item');
    expect(customerItems).toHaveLength(0); // Check that there are no items
  });
});
