import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useToast = defineStore('toast', () => {
  const toasts: Ref<{id: number, msg: string}[]> = ref([])
  let trackId: number = 0;
  const addToast = (msg: string): void => {
    const tempId = trackId;
    toasts.value.push({id: trackId, msg: msg});
    trackId++;
    setTimeout(() => {
      toasts.value = toasts.value.filter((i) => i.id !== tempId);
    }, 10000);
  }
  const removeToast = (id: number): void => {
    toasts.value = toasts.value.filter((i) => i.id !== id);
  }

  return {toasts, addToast, removeToast}
});
