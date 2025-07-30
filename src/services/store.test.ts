import store, { rootReducer, RootState, AppDispatch, useDispatch, useSelector } from './store';
import { constructorSlice } from './slices/constructorSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { feedSlice } from './slices/feedSlice';
import { orderSlice } from './slices/orderSlice';
import { userSlice } from './slices/userSlice';

describe('Redux store', () => {
  it('rootReducer объединяет все слайсы', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toHaveProperty(constructorSlice.name);
    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
  });

  it('неизвестный экшен не изменяет state', () => {
    const prevState = rootReducer(undefined, { type: '@@INIT' });
    const nextState = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });
    expect(nextState).toEqual(prevState);
  });

  it('store создаётся с rootReducer', () => {
    const state = store.getState();
    expect(state).toEqual(rootReducer(undefined, { type: '@@INIT' }));
  });

  it('devTools включены в режиме разработки', () => {
    expect(process.env.NODE_ENV).not.toBe('production');
  });

  it('RootState соответствует структуре store', () => {
    const state: RootState = store.getState();
    expect(state).toHaveProperty(constructorSlice.name);
    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
  });

  it('AppDispatch — это функция', () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(typeof dispatch).toBe('function');
  });

  it('useDispatch и useSelector — функции', () => {
    expect(typeof useDispatch).toBe('function');
    expect(typeof useSelector).toBe('function');
  });
});