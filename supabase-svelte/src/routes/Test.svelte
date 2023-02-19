<script>
  import { onMount } from "svelte";
  import Resizable from "../components/Resizable.svelte";
  import { initEditor } from "../editor.js";
  import { code } from "../stores.js";

    onMount(() => {
      initEditor($code)
    })
</script>

<div class="main-div">
  <Resizable />
  <!-- <div class="codeContainer">
    <div id="editor"></div>
  </div> -->
</div>

<style>
  .main-div { 
    height: 94.2vh;
    overflow: hidden;
    display: flex;
  } 
</style>