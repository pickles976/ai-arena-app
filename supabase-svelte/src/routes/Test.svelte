<script>
  import { onMount } from "svelte";
  import { initEditor } from "../editor.js";

    onMount(() => {
      initEditor()
    })
</script>

<div class="main-div">
  <div class="codeContainer">
    <div id="editor">// Your code here</div>
  </div>
</div>