<script>
    import { Device } from '@capacitor/device'
    import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
    import { auth } from '../firebase'
    import { Button } from 'smelte'

    let loginGoogle = async () => {}
    Device.getInfo().then((info) => {
        if (info.platform === 'web') {
            const provider = new GoogleAuthProvider()
            loginGoogle = () => {
                signInWithRedirect(auth, provider)
            }
        } else {
            const { cfaSignIn } = import('capacitor-firebase-auth')
            loginGoogle = async () => {
                cfaSignIn('google.com').subscribe(async (user) => {})
            }
        }
    })
</script>

<Button on:click={loginGoogle}>Sign In with Google</Button>
