<script>
  import ObjField from "./ObjField.svelte";

  export let object
</script>

<div class="memory-slice bg-gunmetal">
    <ObjField object={object} indent={0}/>
</div>

<style>
    
    .memory-slice {
        cursor: pointer; 
        margin: auto; 
        margin-top: 0.25%;
        margin-bottom: 0.25%;
        padding-left: 2.5%;
        width: 100%;
        height: 5%;
        display: flex;
        font-size: small;
        color: #BBB;
    }

</style>