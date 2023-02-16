import Home from "./routes/Home.svelte";
import Documentation from "./routes/Documentation.svelte";
import Login from "./routes/Login.svelte";

export const routes = {
  "/": Home,
  "/documentation/:object": Documentation,
  "/login/": Login,
  "*": NotFound
};