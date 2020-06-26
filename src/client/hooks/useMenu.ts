import { useEffect, useReducer, useState } from 'react';
import {
  AppError, DietarySelection, Item, Items, MenuHookInterface,
} from 'feedr';

export const reduceMenu = (menu: Items, item: Item): Items => {
  const exists = menu.includes(item);

  return exists ? menu.filter((v) => v !== item) : [...menu, item];
};

export const countDietaries = (menu: Items): DietarySelection => menu.reduce((acc, cur) => {
  cur.dietaries.forEach((i) => { acc[i] = (acc[i] || 0) + 1; });
  return acc;
}, {});

export default (): MenuHookInterface => {
  const [items, setItems]: [Items, (items: Items) => void] = useState<Items>([]);
  const [error, setError]: [AppError, (error: Error) => void] = useState<AppError>();
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  const [search, setSearch]: [string, (search: string) => void] = useState<string>('');
  const [menu, toggleItem]: [Items, (item: Item) => void] = useReducer(
    reduceMenu,
    [],
  );

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await fetch('/api/items')
          .then((response) => response.json());
        setItems(data.items);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems: Items = items.filter((item) => (
    !menu.includes(item) && item.name.toLowerCase().includes(search.toLowerCase())
  ));

  return {
    items: filteredItems,
    dietarySelection: countDietaries(menu),
    menu,
    toggleItem,
    error,
    loading,
    search,
    setSearch,
  };
};
