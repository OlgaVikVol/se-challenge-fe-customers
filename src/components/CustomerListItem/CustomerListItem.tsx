import { Customer } from '../../shared/types/types';

interface CustomerListItemProps {
  customer: Customer;
  onSelect: (id: string) => void;
}

export const CustomerListItem = ({
  customer,
  onSelect,
}: CustomerListItemProps) => {
  return (
    <li onClick={() => onSelect(customer.id)}>
      <h2>{customer.name}</h2>
      <p>{customer.email}</p>
    </li>
  );
};
