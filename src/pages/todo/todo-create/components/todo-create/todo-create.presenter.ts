import { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TodoCreateDto } from '../../../../../models';

interface FormValues {
  title: string;
}

const toDto = (values: FormValues) => {
  const value: TodoCreateDto = {
    title: values.title,
  };
  return value;
};

export const useTodoCreatePresenter = (arg: {
  onCreate?: (todo: TodoCreateDto) => void;
}) => {
  const { onCreate } = arg;

  const initialValues = useMemo(() => {
    return {
      title: '',
    } as FormValues;
  }, []);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      title: Yup.string().required(),
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialErrors: {
      title: '',
    },
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onCreate && onCreate(toDto(values));
    },
  });

  return {
    ...formik,
  } as const;
};
