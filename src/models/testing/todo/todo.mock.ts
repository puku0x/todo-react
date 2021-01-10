import { Todo, TodoCreateDto, TodoUpdateDto } from '../../todo';

export const createTodosMock = (): Todo[] => {
  return [
    {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    },
    {
      id: '2',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    },
    {
      id: '3',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    },
  ];
};

export const createTodoMock = (): Todo => {
  return {
    id: '1',
    title: 'title',
    completed: false,
    createdAt: 123456789,
    updatedAt: 123456789,
  };
};

export const createTodoCreateDtoMock = (): TodoCreateDto => {
  return {
    title: 'title',
  };
};

export const createTodoUpdateDtoMock = (): TodoUpdateDto => {
  return {
    id: '1',
    title: 'title',
    completed: false,
  };
};
