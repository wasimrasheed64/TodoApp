<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue'
import Greetings from '@/components/GreetingsView.vue'
import AddNewForm from '@/components/AddNewForm.vue'

interface Todo {
  content: string;
  category: string;
  done: boolean;
  editable: boolean;
  createdAt: Date;
}

const todos = ref<Todo[]>([]);
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt
  })
)

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  {
    deep: true
  }
)

const addTodo = (data : Todo) => {
  todos.value.push(data)
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

onBeforeMount(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
  <main class="app">
    <Greetings :name="name" />

    <AddNewForm @addTodo="addTodo"></AddNewForm>

    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list" id="todo-list">
        <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span
              :class="`bubble ${todo.category === 'business' ? 'business' : 'personal'}`"
            ></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
