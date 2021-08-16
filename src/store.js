import { writable } from 'svelte/store'

export let user = writable({})
export let loggedIn = writable(false)
