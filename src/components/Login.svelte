<script>
    import supabase from '../supabase'

    //import firebase from './firebase'

    import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
    import { Button } from 'smelte'
    let auth = getAuth()
    let provider = new GoogleAuthProvider()
    export let loginGoogle = async () => {
        signInWithPopup(auth, provider)
    }
</script>

<Button on:click={loginGoogle}>Sign In with Google</Button>
