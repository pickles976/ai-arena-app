// store.js
import { writable } from 'svelte/store';

export const code = writable({
  baseStart: "",
  baseUpdate: "",
  shipStart: "",
  shipUpdate: ""
})

