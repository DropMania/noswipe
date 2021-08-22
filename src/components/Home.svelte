<script>
    import supabase from '../supabase.js'
    import { user } from '../store'
    import LinearProgress from '@smui/linear-progress'
    import Setup from './Setup.svelte'
    import Noswipe from './Noswipe.svelte'
    import Questions from './Questions.svelte'
    supabase.auth.refreshSession()
</script>

{#if $user.id != undefined}
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
