import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  it('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
  })

  it('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    wrapper.vm.start()
    expect(wrapper.element.style.width).toBe('0%')
  })

  it('updates the width percent', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.setData({ percent: 70 })
    expect(wrapper.element.style.width).toBe('70%')
  })

  it('displays the bar when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
    wrapper.vm.start()
    expect(wrapper.classes()).toContain('show')
  })

  it('sets the bar to 100% width when fail is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    expect(wrapper.element.style.width).toBe('100%')
  })

  it('styles the bar correctly when fail is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    expect(wrapper.classes()).toContain('error')
  })

  it('sets the bar to 100% width when finish is called', () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(wrapper.element.style.width).toBe('100%')
    expect(wrapper.classes()).not.toContain('show')
  })
})

