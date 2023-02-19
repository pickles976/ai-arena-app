<script>
    export let object
    // TODO: Recursive field/function printing
    // see traverseObject()
</script>

<div class="memory-slice bg-gunmetal">
    {object.type} : {object.uuid}
</div>

<style>
    
    .memory-slice {
        cursor: pointer; 
        margin: auto; 
        margin-top: 0.25%;
        margin-bottom: 0.25%;
        width: 100%;
        height: 5%;
        display: flex;
    }

</style>