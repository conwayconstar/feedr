import { shallow } from 'enzyme';
import React from 'react';
import Menu, { MenuProps } from '../../components/Menu';

describe('Menu component', () => {
  const props: MenuProps = {
    count: 4,
    dietarySelection: {
      ve: 2,
      v: 3,
      df: 4,
    },
  };
  const wrapper = shallow(<Menu {...props} />);

  it('Menu should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Menu count label should be 4 items', () => {
    expect(wrapper.find('.count').text()).toEqual('4 items');
  });

  it('Menu count label should be 1 item', () => {
    wrapper.setProps({
      count: 1,
      item: {
        id: 10010,
        name: 'Pasta Salad Box',
        dietaries: ['ve', 'v', 'gf', 'df'],
      },
    });
    wrapper.update();
    expect(wrapper.find('.count').text()).toEqual('1 item');
  });
});
