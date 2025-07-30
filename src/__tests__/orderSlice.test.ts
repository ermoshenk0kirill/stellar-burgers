import reducer, {
  fetchOrder,
  fetchOrderNumber,
  createOrder,
  clearOrder
} from '../services/slices/orderSlice';
import { TOrder } from '../utils/types';

const mockOrder: TOrder = {
  _id: '123',
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2025-07-27T19:20:22.074Z',
  updatedAt: '2025-07-27T19:20:22.875Z',
  number: 1234
};

const initialState = {
  name: null,
  order: null,
  orders: [],
  orderNumber: null,
  isLoading: false,
  error: null
};

describe('orderSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('clearOrder очищает name и order', () => {
    const prevState = {
      ...initialState,
      name: 'Some Order',
      order: mockOrder
    };
    const nextState = reducer(prevState, clearOrder());
    expect(nextState.name).toBeNull();
    expect(nextState.order).toBeNull();
  });

  it('fetchOrder.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, { type: fetchOrder.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchOrder.fulfilled сохраняет заказы и выключает isLoading', () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: [mockOrder]
    };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual([mockOrder]);
    expect(state.isLoading).toBe(false);
  });

  it('fetchOrder.rejected сохраняет ошибку и выключает isLoading', () => {
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: 'Ошибка получения заказов' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка получения заказов');
    expect(state.isLoading).toBe(false);
  });

  it('fetchOrderNumber.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, {
      type: fetchOrderNumber.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('fetchOrderNumber.fulfilled сохраняет orderNumber', () => {
    const action = {
      type: fetchOrderNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = reducer(initialState, action);
    expect(state.orderNumber).toEqual(mockOrder);
    expect(state.isLoading).toBe(false);
  });

  it('fetchOrderNumber.rejected сохраняет ошибку', () => {
    const action = {
      type: fetchOrderNumber.rejected.type,
      error: { message: 'Ошибка получения номера заказа' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка получения номера заказа');
    expect(state.isLoading).toBe(false);
  });

  it('createOrder.pending устанавливает isLoading = true', () => {
    const state = reducer(initialState, { type: createOrder.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('createOrder.fulfilled сохраняет name и order', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: {
        name: 'New Order',
        order: mockOrder
      }
    };
    const state = reducer(initialState, action);
    expect(state.name).toBe('New Order');
    expect(state.order).toEqual(mockOrder);
    expect(state.isLoading).toBe(false);
  });

  it('createOrder.rejected сохраняет ошибку', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = reducer(initialState, action);
    expect(state.error).toBe('Ошибка создания заказа');
    expect(state.isLoading).toBe(false);
  });
});
