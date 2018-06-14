import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  it('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
  })

  it('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%')
  })

  it('updates the width percent', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.setData({ percent: 70 })
    expect(wrapper.element.style.width).toBe('70%')
  })
})

