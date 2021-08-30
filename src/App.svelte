<script>
    import 'smelte/src/tailwind.css'
    import 'svelte-material-ui/bare.css'
    import { auth, db } from './firebase'
    import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
    import { Geolocation } from '@capacitor/geolocation'
    import Login from './components/Login.svelte'
    import Home from './components/Home.svelte'
    import LinearProgress from '@smui/linear-progress'
    import { loggedIn, user as userStore } from './store'
    let loading = true
    auth.onAuthStateChanged(async (user) => {
        loading = true
        if (user) {
            loggedIn.set(true)
            let userDoc = await getDoc(doc(db, 'users', user.uid))
            if (!userDoc.exists()) {
                let userData = {
                    uid: user.uid,
                    name: '',
                    state: 'SETUP',
                    gender: '',
                    searchfor: [],
                    birthday: '',
                    minage: 18,
                    maxage: 99,
                    distance: 0,
                    images: [],
                    answers: []
                }
                await setDoc(doc(db, 'users', user.uid), userData)
                userStore.set(userData)
            } else {
                userStore.set(userDoc.data())
            }
            try {
                const coordinates = await Geolocation.getCurrentPosition()
                await updateDoc(doc(db, 'users', user.uid), {
                    location: {
                        lat: coordinates.coords.latitude,
                        lon: coordinates.coords.longitude
                    }
                })
            } catch (e) {}
        } else {
            loggedIn.set(false)
        }
        loading = false
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="smui-theme.css" />
</svelte:head>
<main>
    {#if loading}
        <div class="absolute w-full">
            <LinearProgress indeterminate />
        </div>
    {:else if $loggedIn}
        <Home />
    {:else}
        <Login />
    {/if}
</main>
