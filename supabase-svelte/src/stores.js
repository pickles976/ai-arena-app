// store.js
import { writable } from 'svelte/store';

export const auth = writable({
  session: null,
})

export const code = writable({
  name: "",
  baseStart: "",
  baseUpdate: "",
  shipStart: "",
  shipUpdate: ""
})

