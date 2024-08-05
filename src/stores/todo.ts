import { defineStore } from 'pinia';
import type { Todo } from '@/types/types';
import { ref } from 'vue'

export const todoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

  function updateTodos(todos: Todo[] ) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getAll() {
    return todos.value;
  }

  function add(data:Todo) {
    todos.value.push(data);
    updateTodos(todos.value);
  }

  function remove(todo: Todo) {
    todos.value = todos.value.filter((t) => t !== todo);
    updateTodos(todos.value);
  }

  return {
    todos,
    getAll,
    add,
    remove,
  };
});
