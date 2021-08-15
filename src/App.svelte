<script>
    import 'smelte/src/tailwind.css'
    import { default as Router, push } from 'svelte-spa-router'
    import routes from './routes'
    import supabase from './supabase'

    supabase.auth.onAuthStateChange((data) => {
        let user = supabase.auth.user()
        console.log(user)
        if (user) {
            push('/')
        } else {
            push('/login')
        }
    })
    if (!supabase.auth.user()) {
        push('/login')
    }
</script>

<main>
    <Router {routes} />
</main>
