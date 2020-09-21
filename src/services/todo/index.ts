import { TodoService } from './todo.service';

export const todoService = new TodoService(
  'https://us-central1-todo-api-f1511.cloudfunctions.net/api'
);
