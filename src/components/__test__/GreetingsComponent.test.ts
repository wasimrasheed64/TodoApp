import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import GreetingsView from '@/components/GreetingsView.vue'

describe('GreetingComponent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the initial name', () => {
    const wrapper = mount(GreetingsView, {
      props: {
        name: 'John',
      },
    })
    expect(wrapper.find('input').element.value).toBe('John')
  })


  it('disables the input if localName is set', async () => {
    const wrapper = mount(GreetingsView, {
      props: {
        name: 'John',
      },
    })

    const input = wrapper.find('input')
    expect(input.element.disabled).toBe(true)
  })
})
