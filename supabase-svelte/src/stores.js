// store.js
import { writable } from 'svelte/store';

export const defaultCode = {
  name: "",
  baseStart: "",
  baseUpdate: "",
  shipStart: "",
  shipUpdate: ""
}

export const auth = writable({
  session: null,
})

export const code = writable(defaultCode)

