<script>
    import { db, storage, functions } from '../firebase'
    import { httpsCallable } from 'firebase/functions'
    import { collection, query, where, getDocs } from 'firebase/firestore'
    import LinearProgress from '@smui/linear-progress'
    import { getDownloadURL, ref } from 'firebase/storage'
    import { user } from '../store'
    import { onMount } from 'svelte'
    import Matches from './noswipe-tabs/Matches.svelte'
    import Profile from './noswipe-tabs/Profile.svelte'
    import { Tabs, Tab } from 'smelte'
    let matches = []
    let loading = true
    let items = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 }
    ]
    onMount(async () => {
        let usersRef = collection(db, 'users')
        let q = query(usersRef, where('gender', 'in', $user.searchfor))
        matches = (await getDocs(q)).docs.map((d) => ({
            ...d.data(),
            age: d.data().birthday,
            imgURL: ''
        }))
        matches = await Promise.all(
            matches.map(async (m) => {
                let imageRef = ref(storage, `profile-images/${m.images[0]}`)
                m.imgURL = await getDownloadURL(imageRef)
                return m
            })
        )
        loading = false
        /* let data = await httpsCallable(
            functions,
            'getMatchData'
        )({ uid: $user.uid }) */
    })
</script>

{#if loading}
    <div class="absolute w-full">
        <LinearProgress indeterminate />
    </div>
{:else}
    <Tabs
        selected="3"
        class="bg-black shadow-sm text-yellow-200 "
        classes="absolute bottom-0 w-full border-t-2 border-gray-500"
        let:selected
        {loading}
        items={[
            { id: '1', text: 'Chat', icon: 'chat' },
            { id: '2', text: 'Matches', icon: 'local_fire_department' },
            { id: '3', text: 'Profile', icon: 'person' }
        ]}
    >
        <div
            slot="content"
            class="flex items-center content-center overflow-hidden w-full bg-gray-900 h-full "
        >
            <Tab id="1" {selected}>Chat</Tab>
            <Tab id="2" {selected}>
                <Matches {matches} />
            </Tab>
            <Tab id="3" {selected}>
                <Profile bind:items />
            </Tab>
        </div>
    </Tabs>
{/if}
