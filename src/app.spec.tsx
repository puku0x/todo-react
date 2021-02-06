import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App } from './app';

describe('App', () => {
  it('should render', () => {
    const { baseElement } = render(<App />, { wrapper: MemoryRouter });

    expect(baseElement).toBeTruthy();
  });
});
