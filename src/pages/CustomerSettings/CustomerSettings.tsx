import { Customer } from '../../shared/types/types';
import { Loading } from '../../components/Loading/Loading';
import { ErrorMessage } from '../../components/Error/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { List } from '../../components/List/List';
import { CustomerListItem } from '../../components/CustomerListItem/CustomerListItem';
import { useFetchCustomers } from '../../shared/hooks/useFetchCustomers/useFetchCustomers';
import './CustomerSettings.css';

export const CustomerSettings = () => {
  const { customers, error, loading } = useFetchCustomers();
  const navigate = useNavigate();

  const handleSelectCustomer = (customerId: string) => {
    navigate(`/customer/${customerId}`);
  };

  if (error) {
    return <ErrorMessage error={error}  data-testid="error-message"/>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="customer-settings-container">
      <div className="header">
        <img src="/icons/wave.svg" alt="Wave Icon" className="svg-icon" />
        <h1>Customer Settings</h1>
      </div>
      <List<Customer>
        items={customers}
        renderItem={(customer) => (
          <CustomerListItem
            key={customer.id}
            customer={customer}
            onSelect={() => handleSelectCustomer(customer.id)}
          />
        )}
      />
    </div>
  );
};
