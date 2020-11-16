import { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Todo, TodoUpdateDto } from '../../../../../models';

interface FormValues {
  title: string;
  completed: boolean;
}

const toDto = (todo: Todo, values: FormValues) => {
  const value: TodoUpdateDto = {
    id: todo.id,
    title: values.title,
    completed: values.completed,
  };
  return value;
};

export const useTodoEditPresenter = (arg: {
  todo: Todo | null;
  onUpdate?: (todo: TodoUpdateDto) => void;
}) => {
  const { todo, onUpdate } = arg;

  const initialValues = useMemo(() => {
    return {
      title: todo?.title ?? '',
      completed: todo?.completed ?? '',
    } as FormValues;
  }, [todo]);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      title: Yup.string().required(),
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (todo) {
        onUpdate?.(toDto(todo, values));
      }
    },
  });

  return {
    ...formik,
  } as const;
};
