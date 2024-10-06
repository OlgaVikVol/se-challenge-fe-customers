import { useParams } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/Error/ErrorMessage';
import { CustomerForm } from '../../components/CustomerForm/CustomerForm';
import { useFetchCustomer } from '../../shared/hooks/useFetchCustomer/useFetchCustomer';
import './CustomerDetail.css';

export const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { customer, error, loading } = useFetchCustomer(id || '');

  if (error) {
    return <ErrorMessage error={error} data-testid="error-message" />;
  }

  if (loading) {
    return <Loading data-testid="loading" />;
  }

  if (!customer) {
    return <p data-testid="not-found">Customer not found.</p>;
  }

  return (
    <div className="customer-form-container">
      <h1>Edit Customer</h1>
      <CustomerForm customer={customer} data-testid="customer-form" />
    </div>
  );
};
