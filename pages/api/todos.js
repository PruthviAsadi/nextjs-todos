// pages/api/todos.js
import { getAllTodos, addTodo, updateTodoStatus, deleteTodo, initializeDatabase } from '../../db/sqlite';

// Initialize the database on server start
initializeDatabase();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const todos = getAllTodos();
      res.status(200).json(todos);
      break;
    case 'POST':
      const { text } = body;
      if (!text) return res.status(400).json({ error: 'Text is required' });
      addTodo(text);
      res.status(201).json({ message: 'Todo added' });
      break;
    case 'PUT':
      const { id, completed } = body;
      updateTodoStatus(id, completed);
      res.status(200).json({ message: 'Todo updated' });
      break;
    case 'DELETE':
      const { todoId } = body;
      deleteTodo(todoId);
      res.status(200).json({ message: 'Todo deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
