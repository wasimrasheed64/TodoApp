<script lang="ts" setup>
import { ref } from 'vue'
import type { Todo } from '@/types/types'
const props = defineProps<{
  todos: Todo[];
}>();
const emit = defineEmits(['removeTodo']);
const todos_asc = ref(props.todos);
const removeTodo  = (todo: Todo) => {
  emit('removeTodo', todo);
};


</script>
<template>
  <div v-for="(todo, index) in todos_asc" :key="index" :class="`todo-item d${todo.done && 'done'}`">
    <label>
      <input type="checkbox" v-model="todo.done" />
      <span :class="`bubble ${todo.category === 'business' ? 'business' : 'personal'}`"></span>
    </label>

    <div class="todo-content">
      <input type="text" v-model="todo.content" />
    </div>

    <div class="actions">
      <button class="delete" @click="removeTodo(todo)">Delete</button>
    </div>
  </div>

</template>