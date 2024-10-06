import { Customer } from '../../shared/types/types';

interface CustomerListProps<T> {
  items: T[];
  renderItem: (item: T) => JSX.Element;
}

export const List = <T extends Customer>({
  items,
  renderItem,
}: CustomerListProps<T>) => {
  return <ul>{items.map((item) => renderItem(item))}</ul>;
};
