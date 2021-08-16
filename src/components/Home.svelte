<script>
    import supabase from '../supabase.js'
    import { user } from '../store'
    import { ProgressLinear } from 'smelte'
    import Setup from './Setup.svelte'
    supabase.auth.refreshSession()
</script>

{#if $user.id != undefined}
    {#if $user.state == 'SETUP'}
        <Setup />
    {/if}
{:else}
    <div class="absolute w-full">
        <ProgressLinear />
    </div>
{/if}
