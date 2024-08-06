<script lang="ts" setup>
import { ref, watch } from 'vue';
import { todoStore } from '@/stores/todo';
import type { Todo } from '@/types/types';
const store = todoStore();
const todos =  ref<Todo[]>();


function removeTodo(todo: Todo) {
  store.remove(todo);
  todos.value = store.getAll();
}
todos.value = store.getAll();
</script>
<template>
  <div v-for="(todo, index) in todos" :key="index" :class="`todo-item d${todo.done && 'done'}`">
    <label>
      <input type="checkbox" v-model="todo.done" />
      <span :class="`bubble ${todo.category === 'business' ? 'business' : 'personal'}`"></span>
    </label>

    <div class="todo-content">
      <input :disabled="todo.done" :class="todo.done ? 'class-decoration' : ''" type="text" :key="index + 'todoList'" v-model="todo.content" />
    </div>

    <div class="actions">
      <button class="delete" @click="removeTodo(todo)">Delete</button>
    </div>
  </div>

</template>