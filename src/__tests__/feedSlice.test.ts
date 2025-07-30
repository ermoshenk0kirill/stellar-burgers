import feedReducer, { fetchFeeds } from '../services/slices/feedSlice';
import { TOrder } from '../utils/types';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      number: 123,
      status: 'done',
      name: 'Bun',
      createdAt: '',
      updatedAt: '',
      ingredients: []
    },
    {
      _id: '2',
      number: 124,
      status: 'pending',
      name: 'Bun',
      createdAt: '',
      updatedAt: '',
      ingredients: []
    }
  ];

  it('должен установить isLoading=true и сбросить ошибку при fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить данные при fetchFeeds.fulfilled и выключить isLoading', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };

    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('должен установить ошибку и выключить isLoading при fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };

    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
