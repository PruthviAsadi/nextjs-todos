// db/sqlite.js
import Database from 'better-sqlite3';

const db = new Database('todos.db', { verbose: console.log });

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);
}

export function getAllTodos() {
  return db.prepare('SELECT * FROM todos').all();
}

export function addTodo(text) {
  return db.prepare('INSERT INTO todos (text) VALUES (?)').run(text);
}

export function updateTodoStatus(id, completed) {
  return db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(completed, id);
}

export function deleteTodo(id) {
  return db.prepare('DELETE FROM todos WHERE id = ?').run(id);
}
