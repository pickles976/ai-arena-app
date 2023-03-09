<script>
    export let actions = []
</script>

<div class='panel'>
    <div class="actions-panel">
        {#each actions as entry}
            <div class="item" style="padding: 0.5%;">
                <div><span style="color: {entry.user.color}">{entry.user.name}</span> captured {entry.star.name}!</div>
            </div>
        {/each}
    </div>
</div>

<style>

    .actions-panel {
        /* overflow-y: scroll;  */
        overflow-y: hidden;
        flex-direction: column-reverse;
        max-height: 35vh;
        background-color: #ffffff09;
        padding: 2%;
        overflow-anchor: auto;
    }

    .item {
        display: flex;
        color: #ffffffdf;
    }

    .panel {
        position: absolute;
        top: 8vh;
        right: 0.5vw;
        width: 16%;
    }
</style>
