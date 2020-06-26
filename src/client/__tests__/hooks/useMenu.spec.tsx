import { DietarySelection, Item, Items } from 'feedr';
import {
  countDietaries, reduceMenu,
} from '../../hooks/useMenu';

describe('useMenu hook unit tests', () => {
  describe('reduceMenu works', () => {
    const item: Item = {
      id: 1001,
      name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
      dietaries: ['v', 've', 'df', 'gf', 'n!'],
    };

    it('Should add to item to menu if it doesnt exist', () => {
      const menu: Items = reduceMenu([], item);

      expect(menu).toEqual([item]);
    });

    it('Should remove an item if it already exists', () => {
      const menu: Items = reduceMenu([item], item);

      expect(menu).toEqual([]);
    });
  });

  describe('countDietaries works', () => {
    it('Should count the dietaries from a list of items', () => {
      const items: Items = [
        {
          id: 1001,
          name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
          dietaries: ['v', 've', 'df', 'gf', 'n!'],
        },
        {
          id: 1002,
          name: 'Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots',
          dietaries: ['gf', 'df', 'rsf'],
        },
        {
          id: 1003,
          name: 'Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots',
          dietaries: ['gf', 'df', 'v', 've', 'n!'],
        },
        {
          id: 1004,
          name: 'Hake & Smoky Chickpeas, Herby Potatoes & Turmeric Satay Broccoli',
          dietaries: ['df', 'gf', 'rsf', 'n!'],
        },
      ];

      const dietaryCount: DietarySelection = countDietaries(items);

      expect(dietaryCount).toEqual({
        v: 2, ve: 2, df: 4, gf: 4, 'n!': 3, rsf: 2,
      });
    });
  });
});
