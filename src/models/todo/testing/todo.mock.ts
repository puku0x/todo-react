import { Todo, TodoCreateDto, TodoUpdateDto } from '../todo.model';

export const generateTodosMock = (): Todo[] => {
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

export const generateTodoMock = (): Todo => {
  return {
    id: '1',
    title: 'title',
    completed: false,
    createdAt: 123456789,
    updatedAt: 123456789,
  };
};

export const generateTodoCreateDtoMock = (): TodoCreateDto => {
  return {
    title: 'title',
  };
};

export const generateTodoUpdateDtoMock = (): TodoUpdateDto => {
  return {
    id: '1',
    title: 'title',
    completed: false,
  };
};
