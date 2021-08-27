<script>
    import 'smelte/src/tailwind.css'

    import 'svelte-material-ui/bare.css'
    import firebase from './firebase'
    import supabase from './supabase'
    import Login from './components/Login.svelte'
    import Home from './components/Home.svelte'
    import { loggedIn, user as userStore } from './store'

    supabase.auth.onAuthStateChange(() => {
        let user = supabase.auth.user()
        if (user) {
            supabase
                .from('user')
                .select('*')
                .eq('id', user.id)
                .then(({ data: selData }) => {
                    if (selData.length < 1) {
                        supabase
                            .from('user')
                            .insert({
                                id: user.id
                            })
                            .then(({ error, data }) => {
                                userStore.set(data[0])
                                console.log(error, data)
                            })
                    } else {
                        userStore.set(selData[0])
                    }
                })
            loggedIn.set(true)
        }
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="smui-theme.css" />
</svelte:head>
<main>
    {#if $loggedIn}
        <Home />
    {:else}
        <Login />
    {/if}
</main>
