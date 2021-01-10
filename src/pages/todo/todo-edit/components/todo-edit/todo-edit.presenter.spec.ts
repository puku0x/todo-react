import { act, renderHook } from '@testing-library/react-hooks';

import { Todo } from '../../../../../models';
import { useTodoEditPresenter } from './todo-edit.presenter';

describe('useTodoEditPresenter', () => {
  it('should handle submit', async () => {
    const todo: Todo = {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };
    const onUpdate = jest.fn();
    const { result, waitFor } = renderHook(() =>
      useTodoEditPresenter({ todo, onUpdate })
    );

    await act(async () => {
      const { values, setValues } = result.current;
      setValues({
        ...values,
        title: 'title',
        completed: false,
      });
    });

    await act(async () => {
      const { handleSubmit } = result.current;
      handleSubmit();
    });

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled();
    });
  });
});
