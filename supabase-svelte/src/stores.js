// store.js
import { writable } from 'svelte/store';

export let gameData = writable({
  gameObject: {},
  gameObjects: []
})

export const defaultCode = {
  id : undefined,
  name: " ",
  baseStart: " ",
  baseUpdate: " ",
  shipStart: " ",
  shipUpdate: " "
}

export const auth = writable({
  session: null,
})


export const code = writable(defaultCode)

