import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerListItem } from './CustomerListItem';
import { Customer } from '../../shared/types/types';

describe('CustomerListItem', () => {
  const mockCustomer: Customer = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    channel: 'email',
    address: '123 Main St',
    postal: '12345',
    city: 'Anytown',
    province: 'Anyprovince',
  };

  it('renders the customer name and email', () => {
    render(<CustomerListItem customer={mockCustomer} onSelect={() => {}} />);

    expect(screen.getByText(mockCustomer.name)).toBeInTheDocument();
    expect(screen.getByText(mockCustomer.email)).toBeInTheDocument();
  });

  it('calls onSelect with the correct customer ID when clicked', () => {
    const onSelectMock = vi.fn(); // Create a mock function
    render(
      <CustomerListItem customer={mockCustomer} onSelect={onSelectMock} />
    );

    const listItem = screen.getByRole('listitem'); // Get the <li> element
    fireEvent.click(listItem);

    expect(onSelectMock).toHaveBeenCalledTimes(1); // Verify that the function was called once
    expect(onSelectMock).toHaveBeenCalledWith(mockCustomer.id); // Verify that it was called with the correct ID
  });
});
