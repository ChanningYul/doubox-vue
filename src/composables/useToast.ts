import { reactive } from 'vue'

type ToastItem = { id: number; title?: string; description?: string }
const state = reactive({ items: [] as ToastItem[] })
let id = 1

export function useToast() {
  function show(payload: Omit<ToastItem, 'id'>) {
    const item = { id: id++, ...payload }
    state.items.push(item)
    setTimeout(() => {
      const i = state.items.findIndex(x => x.id === item.id)
      if (i !== -1) state.items.splice(i, 1)
    }, 3000)
  }
  return { state, show }
}