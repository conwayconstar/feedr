import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

export function wait(amount = 0) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}

export const updateWrapper = async (wrapper: ReactWrapper, amount = 0) => {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
};
