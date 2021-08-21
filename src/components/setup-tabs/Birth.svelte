<script>
    import { Button, DatePicker } from 'smelte'
    import { slide } from 'svelte/transition'
    export let formData
    export let state
</script>

<div
    transition:slide
    class="flex flex-col gap-y-10 h-screen w-full justify-start items-center z-0"
>
    <div class="mt-10" />
    <DatePicker label="Enter your birthday" bind:value={formData.birthday} />
    <Button
        disabled={formData.birthday == ''}
        icon="keyboard_arrow_right"
        on:click={() => (state = 'lookin')}>Go on</Button
    >
</div>
