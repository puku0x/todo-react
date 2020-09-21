import { Todo, TodoCreateDto, TodoUpdateDto } from '../../models';

export class TodoService {
  async fetchAll(offset?: number, limit?: number): Promise<Todo[]> {
    const url = new URL(`${this.baseUrl}/todos`);
    if (offset !== undefined) {
      url.searchParams.append('offset', `${offset}`);
    }
    if (limit !== undefined) {
      url.searchParams.append('limit', `${limit}`);
    }
    return await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async fetch(id: string): Promise<Todo> {
    const url = new URL(`${this.baseUrl}/todos/${id}`);
    return await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async create(todo: TodoCreateDto): Promise<Todo> {
    const url = new URL(`${this.baseUrl}/todos/`);
    return await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async update(id: string, todo: TodoUpdateDto): Promise<Todo> {
    const url = new URL(`${this.baseUrl}/todos/${id}`);
    return await fetch(url.toString(), {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async remove(id: string): Promise<string> {
    const url = new URL(`${this.baseUrl}/todos/${id}`);
    await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return id;
  }

  constructor(private readonly baseUrl: string) {}
}
