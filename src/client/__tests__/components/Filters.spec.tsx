import { shallow } from 'enzyme';
import React from 'react';
import Filters, { FiltersProps } from '../../components/Filters';

describe('Filters component', () => {
  const setSearch = jest.fn((search) => search);

  const props: FiltersProps = {
    search: 'Quinoa',
    setSearch,
  };
  const wrapper = shallow(<Filters {...props} />);

  it('Filters should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('setSearch should be called', () => {
    const value = 'Cuban Beef';
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'Cuban Beef' } });
    expect(setSearch.mock.results[0].value).toEqual(value);
  });
});
