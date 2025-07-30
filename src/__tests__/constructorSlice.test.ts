import constructorReducer, {
  addIngredients,
  removeIngredients,
  moveIngredientsUp,
  moveIngredientsDown,
  clearConstructor,
  resetConstructor
} from '../services/slices/constructorSlice';

import { TIngredient } from '../utils/types';

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const ingredient1: TIngredient = {
    _id: 'ing1',
    name: 'Ingredient 1',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 3,
    calories: 80,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const ingredient2: TIngredient = {
    _id: 'ing2',
    name: 'Ingredient 2',
    type: 'main',
    proteins: 12,
    fat: 6,
    carbohydrates: 4,
    calories: 90,
    price: 60,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('возвращает начальное состояние', () => {
    expect(constructorReducer(undefined, { type: '@@INIT' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('добавляет булку в состояние', () => {
    const state = constructorReducer(undefined, addIngredients(bun));
    expect(state.bun).toMatchObject({
      ...bun,
      id: expect.any(String)
    });
  });

  it('добавляет ингредиент в список', () => {
    const state = constructorReducer(undefined, addIngredients(ingredient1));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('удаляет ингредиент по id', () => {
    const addedState = constructorReducer(undefined, addIngredients(ingredient1));
    const idToRemove = addedState.ingredients[0].id;

    const removedState = constructorReducer(addedState, removeIngredients(idToRemove));
    expect(removedState.ingredients).toHaveLength(0);
  });

  it('перемещает ингредиент вверх', () => {
    let state = constructorReducer(undefined, addIngredients(ingredient1));
    state = constructorReducer(state, addIngredients(ingredient2));

    const ing1 = state.ingredients[0];
    const ing2 = state.ingredients[1];

    const movedState = constructorReducer(state, moveIngredientsUp({ id: ing2.id }));
    expect(movedState.ingredients[0]).toEqual(ing2);
    expect(movedState.ingredients[1]).toEqual(ing1);
  });

  it('перемещает ингредиент вниз', () => {
    let state = constructorReducer(undefined, addIngredients(ingredient1));
    state = constructorReducer(state, addIngredients(ingredient2));

    const ing1 = state.ingredients[0];
    const ing2 = state.ingredients[1];

    const movedState = constructorReducer(state, moveIngredientsDown({ id: ing1.id }));
    expect(movedState.ingredients[0]).toEqual(ing2);
    expect(movedState.ingredients[1]).toEqual(ing1);
  });

  it('очищает конструктор через clearConstructor', () => {
    let state = constructorReducer(undefined, addIngredients(ingredient1));
    state = constructorReducer(state, addIngredients(bun));
    const clearedState = constructorReducer(state, clearConstructor());
    expect(clearedState).toEqual({ bun: null, ingredients: [] });
  });

  it('очищает конструктор через resetConstructor', () => {
    let state = constructorReducer(undefined, addIngredients(ingredient1));
    state = constructorReducer(state, addIngredients(bun));
    const resetState = constructorReducer(state, resetConstructor());
    expect(resetState).toEqual({ bun: null, ingredients: [] });
  });
});
