import { act, renderHook } from '@testing-library/react-hooks';
import useMenu from '../../hooks/useMenu';
import items from '../../../server/items';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ items }),
}));

describe('useMenu hook end2end tests', () => {
  it('Should fetch results', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMenu());
    await waitForNextUpdate();

    const {
      menu, items: resultItems, loading, error, dietarySelection,
    } = result.current;

    expect(resultItems).toEqual(items);
    expect(menu).toEqual([]);
    expect(error).toEqual(undefined);
    expect(loading).toEqual(false);
    expect(dietarySelection).toEqual({});
  });

  it('Should add an item to the menu', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMenu());
    await waitForNextUpdate();
    const selectedItem = result.current.items[3];
    act(() => {
      result.current.toggleItem(selectedItem);
    });
    const {
      menu, items: resultItems, dietarySelection,
    } = result.current;

    expect(menu).toEqual([selectedItem]);
    expect(resultItems).toEqual(items.filter((item) => item !== selectedItem));
    expect(dietarySelection).toEqual({
      df: 1,
      gf: 1,
      'n!': 1,
      rsf: 1,
    });
  });

  it('Should remove item from menu', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMenu());
    await waitForNextUpdate();
    const { toggleItem } = result.current;
    const [item1, item2, item3, item4] = result.current.items;
    const fullMenu = [item1, item2, item3, item4];

    act(() => {
      fullMenu.forEach((v) => toggleItem(v));
    });

    expect(result.current.menu).toEqual(fullMenu);

    act(() => {
      toggleItem(item3);
    });

    expect(result.current.menu).toEqual(fullMenu.filter((item) => item !== item3));
    expect(result.current.dietarySelection).toEqual({
      df: 3,
      gf: 3,
      'n!': 2,
      rsf: 2,
      v: 1,
      ve: 1,
    });
  });

  it('Should filter items which contain Cuban Beef in the name', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMenu());
    await waitForNextUpdate();
    expect(result.current.items.length).toEqual(20);
    act(() => {
      result.current.setSearch('Cuban Beef');
    });
    expect(result.current.search).toEqual('Cuban Beef');
    expect(result.current.items.length).toEqual(2);
  });

  it('Should catch error', async () => {
    const apiError = new Error('The API is down :(');
    // @ts-ignore
    fetch.mockImplementationOnce(() => Promise.reject(apiError));
    const { result, waitForNextUpdate } = renderHook(() => useMenu());
    await waitForNextUpdate();
    expect(result.current.error).toEqual(apiError);
  });
});
