<script>
    import { user } from '../../store'
    import { storage } from '../../firebase'
    import { onMount } from 'svelte'
    import { flip } from 'svelte/animate'
    import { dndzone } from 'svelte-dnd-action'
    import { getDownloadURL, ref } from 'firebase/storage'
    export let items = []
    const flipDurationMs = 300
    function handleDndConsider(e) {
        items = e.detail.items
    }
    function handleDndFinalize(e) {
        items = e.detail.items
        items = items.sort((a, b) => a.id - b.id)
    }
    onMount(async () => {
        items = await Promise.all(
            items.map(async (item, i) => {
                if ($user.images[i]) {
                    let imgRef = ref(
                        storage,
                        `profile-images/${$user.images[i]}`
                    )
                    item.src = await getDownloadURL(imgRef)
                }
                return item
            })
        )
    })
</script>

<div class="w-full">
    <section
        use:dndzone={{ items, flipDurationMs }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
        class="grid grid-cols-3 w-full gap-3 p-2"
    >
        {#each items as item (item.id)}
            <div
                animate:flip={{ duration: flipDurationMs }}
                class="w-full h-48 bg-black rounded-lg bg-opacity-25 flex justify-center items-center"
            >
                {#if item.src}
                    <img
                        src={item.src}
                        alt={item.id}
                        class="h-full w-full object-cover rounded-lg shadow-md"
                    />
                {:else}
                    No Image
                {/if}
            </div>
        {/each}
    </section>
</div>
