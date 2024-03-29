// store.js
import { writable } from 'svelte/store';

export let activeCode = writable(null)

export let gameData = writable({
  selectedUUID: 0,
  gameObject: {},
  gameObjects: [],
  score: {},
  ships: {},
  startTime: 0,
  time: 0,
})

export const newCode = {
  id : undefined,
  name: "",
  baseStart: "",
  baseUpdate: "",
  shipStart: "",
  shipUpdate: ""
}

export const defaultCode = {
  id : undefined,
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
export const enemyCode = writable(defaultCode)

