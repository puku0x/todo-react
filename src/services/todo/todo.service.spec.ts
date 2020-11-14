import { Todo, TodoCreateDto, TodoUpdateDto } from '../../models';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  const fetch = globalThis.fetch;
  const baseUrl = 'http://localhost:3000';
  const service = new TodoService(baseUrl);

  afterAll(() => {
    globalThis.fetch = fetch;
  });

  it('should handle fetchAll', async () => {
    const offset = 0;
    const limit = 10;
    const todos: Todo[] = [
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

    const fetchMock = jest.fn().mockResolvedValueOnce({ json: () => todos });
    globalThis.fetch = fetchMock;

    const result = await service.fetchAll(offset, limit);

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}/todos?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    expect(result).toBe(todos);
  });

  it('should handle fetch', async () => {
    const id = '1';
    const todo: Todo = {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };

    const fetchMock = jest.fn().mockResolvedValueOnce({ json: () => todo });
    globalThis.fetch = fetchMock;

    const result = await service.fetch(id);

    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/todos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toBe(todo);
  });

  it('should handle create', async () => {
    const todo: Todo = {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };
    const dto: TodoCreateDto = {
      title: 'title',
    };

    const fetchMock = jest.fn().mockResolvedValueOnce({ json: () => todo });
    globalThis.fetch = fetchMock;

    const result = await service.create(dto);

    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/todos`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toBe(todo);
  });

  it('should handle update', async () => {
    const id = '1';
    const todo: Todo = {
      id: '1',
      title: 'title',
      completed: false,
      createdAt: 123456789,
      updatedAt: 123456789,
    };
    const dto: TodoUpdateDto = {
      id: '1',
      title: 'title',
      completed: true,
    };

    const fetchMock = jest.fn().mockResolvedValueOnce({ json: () => todo });
    globalThis.fetch = fetchMock;

    const result = await service.update(id, dto);

    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toBe(todo);
  });

  it('should handle remove', async () => {
    const id = '1';

    const fetchMock = jest.fn().mockResolvedValueOnce(undefined);
    globalThis.fetch = fetchMock;

    const result = await service.remove(id);

    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toBe(id);
  });
});
