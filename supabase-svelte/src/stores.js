// store.js
import { writable } from 'svelte/store';

export let gameData = writable({
  gameObject: {},
  gameObjects: [],
  score: {},
  ships: {},
  startTime: 0,
  time: ""
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

