<script>
    import { user } from '../store'
    import LinearProgress from '@smui/linear-progress'
    import Setup from './Setup.svelte'
    import Noswipe from './Noswipe.svelte'
    import Questions from './Questions.svelte'
</script>

{#if $user.uid != undefined}
    {#if $user.state == 'SETUP'}
        <Setup />
    {:else if $user.state == 'QUESTIONS'}
        <Questions />
    {:else if $user.state == 'DONE'}
        <Noswipe />
    {/if}
{:else}
    <div class="absolute w-full">
        <LinearProgress indeterminate />
    </div>
{/if}
