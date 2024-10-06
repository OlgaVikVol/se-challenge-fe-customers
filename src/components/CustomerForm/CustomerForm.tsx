import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerFormSchema } from '../../shared/validation/customerFormSchema';
import { Customer } from '../../shared/types/types';
import './CustomerForm.css';

interface CustomerFormProps {
  customer: Customer;
}

type CustomerWithoutId = Omit<Customer, 'id'>;

export const CustomerForm = ({ customer }: CustomerFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues: CustomerWithoutId = useMemo(
    () => ({
      name: customer.name,
      email: customer.email,
      channel: customer.channel ?? 'email',
      address: customer.address ?? '',
      postal: customer.postal ?? '',
      city: customer.city ?? '',
      province: customer.province ?? '',
    }),
    [customer]
  );

  // Initialize react-hook-form with validation schema
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CustomerWithoutId>({
    defaultValues,
    resolver: yupResolver(customerFormSchema),
    mode: 'onChange',
  });

  // Handler for form submission
  const onSubmitHandler = (data: CustomerWithoutId) => {
    setIsSubmitted(true);
    console.log('Submitted customer data:', JSON.stringify({ id, ...data }));

    // Reset submission state after a delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} data-testid="customer-form">
      {/* Name Field */}
      <div className="input-container">
        <label className="input-label">Name:</label>
        <input type="text" {...register('name')} data-testid="name-input" />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="input-container">
        <label className="input-label">Email:</label>
        <input type="email" {...register('email')} data-testid="email-input" />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      {/* Channel Field */}
      <div className="input-container">
        <label className="input-label">Channel:</label>
        <Controller
          name="channel"
          control={control}
          render={({ field }) => (
            <select {...field} data-testid="channel-select">
              <option value="website">Website</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="word-of-mouth">Word of Mouth</option>
              <option value="other">Other</option>
              <option value="unknown">Unknown</option>
            </select>
          )}
        />
        {errors.channel && (
          <p className="error-message">{errors.channel.message}</p>
        )}
      </div>

      {/* Address Field */}
      <div className="input-container">
        <label className="input-label">Address:</label>
        <input
          type="text"
          {...register('address')}
          data-testid="address-input"
        />
      </div>

      {/* Postal Code Field */}
      <div className="input-container">
        <label className="input-label">Postal Code:</label>
        <input type="text" {...register('postal')} data-testid="postal-input" />
      </div>

      {/* City Field */}
      <div className="input-container">
        <label className="input-label">City:</label>
        <input type="text" {...register('city')} data-testid="city-input" />
      </div>

      {/* Province Field */}
      <div className="input-container">
        <label className="input-label">Province:</label>
        <input
          type="text"
          {...register('province')}
          data-testid="province-input"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
        disabled={!isValid || isSubmitted}
        data-testid="submit-button"
      >
        {isSubmitted ? 'Submitted!' : 'Submit'}
      </button>
    </form>
  );
};
