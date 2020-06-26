import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { DietarySelection } from 'feedr';
import items from '../../server/items';
import { updateWrapper } from './testHelpers';
import App from '../App';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ items }),
}));

describe('App loads and menu works', () => {
  let wrapper: ReactWrapper;

  it('Homepage matches snapshot', async () => {
    wrapper = mount(<App />);
    expect(wrapper.text()).toEqual('Loading...');
    await updateWrapper(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  describe('App page functionality', () => {
    beforeEach(async () => {
      wrapper = mount(<App />);
      await updateWrapper(wrapper);
    });

    it('Should add an item to the menu', () => {
      const item = wrapper.find('.item-picker Item').first();
      item.simulate('click');
      wrapper.update();
      const menuItems = wrapper.find('.menu-preview Item');
      expect(wrapper.find('.item-picker Item').length).toEqual(19);
      expect(menuItems.length).toEqual(1);
      expect(menuItems.first().prop('item')).toEqual({
        id: 1001,
        name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
        dietaries: ['v', 've', 'df', 'gf', 'n!'],
      });
    });

    it('Should remove an item', () => {
      const itemEls = wrapper.find('.item-picker Item');
      for (let i = 0; i < 4; i += 1) {
        itemEls.at(i).simulate('click');
        wrapper.update();
      }
      const menuItems = wrapper.find('.menu-preview Item');
      expect(wrapper.find('.item-picker Item').length).toEqual(16);
      expect(menuItems.length).toEqual(4);
      menuItems.at(1).find('button').simulate('click');
      wrapper.update();
      expect(wrapper.find('.menu-preview Item').length).toEqual(3);
      expect(wrapper.find('.item-picker Item').length).toEqual(17);
      expect(wrapper.find('.menu-preview').render()).toMatchSnapshot();
    });

    it('Should add up dietary info', () => {
      const itemEls = wrapper.find('.item-picker Item');
      for (let i = 0; i < 4; i += 1) {
        itemEls.at(i).simulate('click');
        wrapper.update();
      }

      const menu = wrapper.find('Menu');
      const dietarySelection: DietarySelection = menu.prop('dietarySelection');
      Object.keys(dietarySelection).forEach((diet, i) => {
        const dietary = menu.find('.menu-summary-right > span').at(i);
        expect(dietary.find('.dietary-count').text()).toEqual(`${dietarySelection[diet]}x`);
        expect(dietary.find('.dietary').text()).toEqual(diet);
      });
    });

    it('Should filter items which contain Cuban Beef in the name', async () => {
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: 'Cuban Beef' } });
      wrapper.update();

      const itemEls = wrapper.find('.item-picker Item');
      expect(itemEls.length).toEqual(2);
      expect(itemEls.at(0).find('h2').text()).toEqual('Cuban Beef, Brown Rice & Quinoa, Green Pepper & Butterbean Salad');
      expect(itemEls.at(1).find('h2').text()).toEqual('Cuban Beef, Herby Potatoes & Turmeric Satay Broccoli');
    });
  });

  it('Should catch error', async () => {
    const apiError = new Error('The API is down :(');
    // @ts-ignore
    fetch.mockImplementationOnce(() => Promise.reject(apiError));
    wrapper = mount(<App />);
    await updateWrapper(wrapper);

    expect(wrapper.text()).toEqual(apiError.message);
  });
});
