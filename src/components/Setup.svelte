<script>
    import { user } from '../store'
    import { collection, getDocs } from 'firebase/firestore'
    import { db } from '../firebase'
    import { doc, updateDoc, getDoc } from 'firebase/firestore'
    import Name from './setup-tabs/Name.svelte'
    import Birth from './setup-tabs/Birth.svelte'
    import Lookin from './setup-tabs/Lookin.svelte'
    let genders = []
    let loadGenders = async () => {
        genders = (await getDocs(collection(db, 'genders'))).docs.map(
            (d) => d.data().text
        )
    }
    loadGenders()
    let state = 'name'
    let formData = {
        name: '',
        birthday: '',
        gender: '',
        searchfor: [],
        minage: 18,
        maxage: 99,
        distance: 0
    }

    let updateUser = async () => {
        let userDoc = doc(db, 'users', $user.uid)
        await updateDoc(userDoc, {
            ...formData,
            state: 'QUESTIONS'
        })
        let docData = (await getDoc(userDoc)).data()
        user.set(docData)
    }
</script>

<div
    class="flex flex-col items-center content-center overflow-hidden w-full h-full "
>
    {#if state == 'name'}
        <Name bind:formData bind:state {genders} />
    {:else if state == 'birthday'}
        <Birth bind:formData bind:state />
    {:else if state == 'lookin'}
        <Lookin bind:formData {genders} {updateUser} />
    {/if}
</div>
