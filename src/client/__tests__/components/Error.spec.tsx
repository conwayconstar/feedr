import { shallow } from 'enzyme';
import React from 'react';
import ErrorEl from '../../components/Error';

describe('Loading component', () => {
  const error = new Error('There has been an error');
  const wrapper = shallow(<ErrorEl error={error} />);

  it('Loading should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
