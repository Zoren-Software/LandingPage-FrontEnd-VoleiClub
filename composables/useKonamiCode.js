import { onMounted, onUnmounted } from 'vue'

export function useKonamiCode(callback) {
  const sequence = [38, 38, 40, 40, 37, 39, 37, 39]
  let position = 0

  const keyHandler = (e) => {
    if (e.keyCode === sequence[position]) {
      position++
      if (position === sequence.length) {
        callback()
        position = 0
      }
    } else {
      position = 0
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', keyHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', keyHandler)
  })
}