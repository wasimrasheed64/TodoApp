import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { todoStore } from '@/stores/todo'
import AddNewForm from '@/components/AddNewForm.vue'
import { createTestingPinia } from '@pinia/testing'

describe('CreateTodoComponent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the form', () => {
    const wrapper = mount(AddNewForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper.find('form').exists()).toBe(true)
  })



  it('does not add a todo when category is not selected', async () => {
    const wrapper = mount(AddNewForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    const inputContent = wrapper.find('input[name="content"]')
    await inputContent.setValue('A new todo')
    const store = todoStore()
    const addSpy = vi.spyOn(store, 'add')

    await wrapper.find('form').trigger('submit.prevent')
    expect(addSpy).not.toHaveBeenCalled()
  })

  it('adds a todo when content and category are provided', async () => {
    const wrapper = mount(AddNewForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    const inputContent = wrapper.find('input[name="content"]')
    const inputCategory = wrapper.find('input[value="business"]')
    await inputContent.setValue('A new todo')
    await inputCategory.setValue()

    const store = todoStore()
    const addSpy = vi.spyOn(store, 'add')

    await wrapper.find('form').trigger('submit.prevent')
    expect(addSpy).toHaveBeenCalled()
    expect(store.add).toHaveBeenCalledWith(expect.objectContaining({
      content: 'A new todo',
      category: 'business',
      done: false,
      editable: false,
      createdAt: expect.any(Date),
    }))
  })
})
