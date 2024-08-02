<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  name: string
}>()
const localName = ref(props.name)
watch(localName, (newVal) => {
  localStorage.setItem('name', newVal)
})
</script>

<template>
  <section class="greeting">
    <h2 class="title">
      What's up,
      <input
        type="text"
        id="name"
        placeholder="Name here"
        v-model="localName"
        :disabled="!!localName"
      />
    </h2>
  </section>
</template>

<style scoped></style>
