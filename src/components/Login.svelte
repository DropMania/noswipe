<script>
    import supabase from '../supabase'
    import { Button } from 'smelte'
    export let loginGoogle = async () => {
        let { data } = await supabase.auth.signIn(
            {
                provider: 'google'
            },
            {
                redirectTo: location.href
            }
        )
    }
</script>

<Button on:click={loginGoogle}>Sign In with Google</Button>
