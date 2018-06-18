import {
  shallowMount
} from '@vue/test-utils'
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

  it('displays the bar when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
    wrapper.vm.start()
    expect(wrapper.classes()).toContain('show')
  })

  it('increments the width by 1% every 100ms when start is called', () => {
    jest.useFakeTimers()
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    jest.runTimersToTime(100)
    expect(wrapper.element.style.width).toBe('1%')
    jest.runTimersToTime(900)
    expect(wrapper.element.style.width).toBe('10%')
    jest.runTimersToTime(4000)
    expect(wrapper.element.style.width).toBe('50%')
    jest.useRealTimers() // make sure to always include this
  })

  it('clears _timer when finish is called', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
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