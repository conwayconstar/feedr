import { shallow } from 'enzyme';
import React from 'react';
import { Item as ItemType } from 'feedr';
import Item, { ItemProps } from '../../components/Item';

describe('Item component', () => {
  const toggleItem = jest.fn((item) => item);
  const item: ItemType = {
    id: 1001,
    name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
    dietaries: ['v', 've', 'df', 'gf', 'n!'],
  };
  const props: ItemProps = {
    item,
    toggleItem,
  };
  const wrapper = shallow(<Item {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Item should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('toggleItem should be called', () => {
    const itemEl = wrapper.find('.item');
    itemEl.simulate('click');
    expect(toggleItem.mock.results[0].value).toEqual(item);
  });

  it('Item component inside the menu', () => {
    wrapper.setProps({ menu: true });
    wrapper.update();
    const button = wrapper.find('.remove-item');
    expect(wrapper.find('.item').prop('onClick')).toEqual(undefined);
    expect(button.length).toEqual(1);
    button.simulate('click');
    expect(toggleItem.mock.results[0].value).toEqual(item);
  });
});
