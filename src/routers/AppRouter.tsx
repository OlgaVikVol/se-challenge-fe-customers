import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';
import { CustomerDetail } from '../pages/CustomerDetail/CustomerDetail';
import { CustomerSettings } from '../pages/CustomerSettings/CustomerSettings';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerSettings />} />
      <Route path="/customer/:id" element={<CustomerDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
