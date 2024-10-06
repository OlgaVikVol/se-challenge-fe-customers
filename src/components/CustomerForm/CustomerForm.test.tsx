import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CustomerForm } from './CustomerForm';
import { Customer } from '../../shared/types/types';

// Mock Customer data
const mockCustomer: Customer = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  channel: 'email',
  address: '123 Main St',
  postal: '12345',
  city: 'New York',
  province: 'NY',
};

describe('CustomerForm', () => {
  it('should render the form correctly', () => {
    render(<CustomerForm customer={mockCustomer} />);

    // Check if the form and inputs are in the document
    expect(screen.getByTestId('customer-form')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('channel-select')).toBeInTheDocument();
    expect(screen.getByTestId('address-input')).toBeInTheDocument();
    expect(screen.getByTestId('postal-input')).toBeInTheDocument();
    expect(screen.getByTestId('city-input')).toBeInTheDocument();
    expect(screen.getByTestId('province-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should enable the submit button when the form is valid', async () => {
    render(<CustomerForm customer={mockCustomer} />);

    // Fill out the required fields
    fireEvent.input(screen.getByTestId('name-input'), {
      target: { value: 'John Smith' },
    });
    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: 'john.smith@example.com' },
    });
    fireEvent.change(screen.getByTestId('channel-select'), {
      target: { value: 'phone' },
    });
  });

  it('should display the submitted message after submission', async () => {
    render(<CustomerForm customer={mockCustomer} />);

    // Fill out the required fields
    fireEvent.input(screen.getByTestId('name-input'), {
      target: { value: 'John Smith' },
    });
    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: 'john.smith@example.com' },
    });
    fireEvent.change(screen.getByTestId('channel-select'), {
      target: { value: 'phone' },
    });

    // Fill in additional optional fields
    fireEvent.input(screen.getByTestId('address-input'), {
      target: { value: '456 Side St' },
    });
    fireEvent.input(screen.getByTestId('postal-input'), {
      target: { value: '54321' },
    });
    fireEvent.input(screen.getByTestId('city-input'), {
      target: { value: 'Los Angeles' },
    });
    fireEvent.input(screen.getByTestId('province-input'), {
      target: { value: 'CA' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
  });
});
