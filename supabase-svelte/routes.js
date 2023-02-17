/** UNUSED!!! */
import Home from "./routes/Home.svelte"
import Documentation from "./routes/Documentation.svelte"
import Login from "./routes/Login.svelte"
import Browser from "./routes/Browser.svelte"

export const routes = {
  "/home/": Home,
  "/documentation/:object": { component: Documentation, refresh: true },
  "/login/": Login,
  "/browser/" : Browser,
  "*": NotFound
};