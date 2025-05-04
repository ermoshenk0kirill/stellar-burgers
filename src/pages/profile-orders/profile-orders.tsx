import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrder, getOrdersSelector } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrdersSelector) || [];

  useEffect(() => {
    dispatch(fetchOrder())
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
