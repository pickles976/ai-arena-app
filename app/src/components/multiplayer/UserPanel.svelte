<script>
    export let data = {}
</script>

<div class='panel'>

    <div class="vertical-list user-panel">
    {#each Object.values(data) as entry}
        <div class="item" style="padding: 0.5%;">
            <div class='color-box' style='background-color: {entry.color}c0; margin-right: 2%;'></div>
            <div>{entry.name} : {entry.strength}</div>
        </div>
    {/each}
    </div>

</div>

<style>

    .user-panel {
        overflow-y: scroll; 
        max-height: 75vh;
        background-color: #ffffff09;
        padding: 2%;
    }

    .color-box {
        width: 2.5vw;
        /* height: 20vh; */
    }

    .item {
        display: flex;
    }

    .panel {
        position: absolute;
        top: 8vh;
        left: 0.5vw;
        width: 15%;
    }
</style>