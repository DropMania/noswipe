<script>
    /*  import {
        signInWithRedirect,
        GoogleAuthProvider
    } from 'firebase/auth' */
    import { cfaSignIn } from 'capacitor-firebase-auth'
    import { Button } from 'smelte'
    /* let auth = getAuth()
    let provider = new GoogleAuthProvider() */
    let name = 'test'
    let loginGoogle = async () => {
        name = 'other'
        cfaSignIn('google.com').subscribe(async (user) => {
            name = user.displayName
        })
        /* signInWithRedirect(auth, provider) */
    }
</script>

{name}
<Button on:click={loginGoogle}>Sign In with Google</Button>
