<script>
    import { cfaSignIn } from 'capacitor-firebase-auth'
    import { Button } from 'smelte'

    let loginGoogle = async () => {
        cfaSignIn('google.com').subscribe(async (user) => {})
    }
</script>

<Button on:click={loginGoogle}>Sign In with Google</Button>
