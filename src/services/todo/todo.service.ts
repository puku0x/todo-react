import { Todo, TodoCreateDto, TodoUpdateDto } from '../../models';

export class TodoService {
  fetchAll(offset?: number, limit?: number): Promise<Todo[]> {
    const url = new URL(`${this.baseUrl}/todos`);
    if (offset !== undefined) {
      url.searchParams.append('offset', `${offset}`);
    }
    if (limit !== undefined) {
      url.searchParams.append('limit', `${limit}`);
    }

    return fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  }

  fetch(id: string): Promise<Todo> {
    const url = new URL(`${this.baseUrl}/todos/${id}`);

    return fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  }

  create(todo: TodoCreateDto): Promise<Todo> {
    const url = new URL(`${this.baseUrl}/todos`);

    return fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  }

  update(id: string, todo: TodoUpdateDto): Promise<Todo> {
    const url = new URL(`${this.baseUrl}/todos/${id}`);

    return fetch(url.toString(), {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  }

  remove(id: string): Promise<string> {
    const url = new URL(`${this.baseUrl}/todos/${id}`);

    return fetch(url.toString(), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(() => id);
  }

  constructor(private readonly baseUrl: string) {}
}
