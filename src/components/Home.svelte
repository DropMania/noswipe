<script>
    import supabase from '../supabase.js'
    import { user } from '../store'
    import { ProgressLinear } from 'smelte'
    import Setup from './Setup.svelte'
    import Noswipe from './Noswipe.svelte'
    supabase.auth.refreshSession()
</script>

{#if $user.id != undefined}
    {#if $user.state == 'SETUP'}
        <Setup />
        {:else if $user.state == 'DONE'}
        <Noswipe />
    {/if}
{:else}
    <div class="absolute w-full">
        <ProgressLinear />
    </div>
{/if}
