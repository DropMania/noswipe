<script>
    export let matches = []
</script>

<div
    class="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-3"
>
    {#each matches as match}
        <div class="relative">
            <img
                src={match.imgURL}
                alt={match.name}
                class="w-full h-72 object-cover rounded-lg shadow-md"
            />
            <div
                class="absolute bottom-0 right-0 bg-gray-900 w-full bg-opacity-75 py-1 text-xl"
            >
                {match.name}
            </div>
            <div
                class="rounded-full bg-blue-500 absolute p-2 top-1 right-1 text-lg"
            >
                100%
            </div>
        </div>
    {/each}
</div>
