<script>
    import { Button, Select } from 'smelte'
    import RangeSlider from '@smui/slider'

    import { slide } from 'svelte/transition'
    export let formData
    export let genders
    export let updateUser
</script>

<div
    transition:slide
    class="flex flex-col gap-y-10 h-screen w-full justify-start items-center  z-0"
>
    <h3 class="mt-10">Looking for</h3>
    <div class="flex flex-col items-center">
        <RangeSlider
            class="w-56"
            range
            min={18}
            max={99}
            bind:start={formData.minage}
            bind:end={formData.maxage}
        />

        Age Range: {formData.minage} - {formData.maxage}
    </div>
    <Select
        items={genders}
        bind:value={formData.searchfor}
        label="Select Gender"
    />
    <div class="flex flex-col items-center">
        <RangeSlider
            class="w-56"
            min={0}
            max={100}
            bind:value={formData.distance}
        />Range:
        {#if formData.distance == 0}
            Everywhere
        {:else}
            {formData.distance}km
        {/if}
    </div>
    <Button
        disabled={formData.birthday == ''}
        icon="keyboard_arrow_right"
        on:click={updateUser}>Save Data</Button
    >
</div>
