<script>
    import { user } from '../store'
    import Setup from './Setup.svelte'
    import Noswipe from './Noswipe.svelte'
    import Questions from './Questions.svelte'
</script>

{#if $user.state == 'SETUP'}
    <Setup />
{:else if $user.state == 'QUESTIONS'}
    <Questions />
{:else if $user.state == 'DONE'}
    <Noswipe />
{/if}
