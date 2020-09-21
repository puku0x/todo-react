import { act, renderHook } from '@testing-library/react-hooks';

import { useTodoCreatePresenter } from './todo-create.presenter';

describe('useTodoCreateForm', () => {
  it('should handle submit', async () => {
    const onCreate = jest.fn();
    const { result, waitFor } = renderHook(() =>
      useTodoCreatePresenter({ onCreate })
    );

    await act(async () => {
      const { values, setValues } = result.current;
      setValues({
        ...values,
        title: 'title',
      });
    });

    await act(async () => {
      const { handleSubmit } = result.current;
      handleSubmit();
    });

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalled();
    });
  });
});
