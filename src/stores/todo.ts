import { defineStore } from 'pinia';
import type { Todo } from '@/types/types';
import { onBeforeMount, ref, watch } from 'vue'

export const todoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  onBeforeMount(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos);
    }
  });
  watch(todos, (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, { deep: true });

  function getAll() {
    return todos.value;
  }

  function add(data:Todo) {
    todos.value.push(data);
  }

  function remove(todo: Todo) {
    todos.value = todos.value.filter((t) => t !== todo);
  }

  return {
    todos,
    getAll,
    add,
    remove,
  };
});
