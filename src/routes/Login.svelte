<script>
    import supabase from '../supabase'
    import { Button } from 'smelte'
    export let loginGoogle = () => {
        supabase.auth.signIn({
            provider: 'google'
        })
    }
</script>

<Button on:click={loginGoogle}>Login with Google</Button>
