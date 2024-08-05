<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import Greetings from '@/components/GreetingsView.vue'
import AddNewForm from '@/components/AddNewForm.vue'
import ShowList from '@/components/ShowList.vue'
const name = ref('')
onBeforeMount(() => {
  name.value = localStorage.getItem('name') || ''
})
</script>

<template>
  <main class="app">
    <Greetings :name="name" />
    <AddNewForm ></AddNewForm>
    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list" id="todo-list">
      <ShowList></ShowList>
      </div>
    </section>
  </main>
</template>
