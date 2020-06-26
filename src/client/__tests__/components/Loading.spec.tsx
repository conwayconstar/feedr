import { shallow } from 'enzyme';
import React from 'react';
import Loading from '../../components/Loading';

describe('Loading component', () => {
  const wrapper = shallow(<Loading />);

  it('Loading should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
