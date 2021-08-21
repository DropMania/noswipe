<script>
    import supabase from '../supabase'
    import { user } from '../store'
    import Name from './setup-tabs/Name.svelte'
    import Birth from './setup-tabs/Birth.svelte'
    import Lookin from './setup-tabs/Lookin.svelte'
    let genders = []
    let loadGenders = async () => {
        genders = (await supabase.from('gender').select('*')).data.map((g) => ({
            value: g.id,
            text: g.text
        }))
    }
    loadGenders()
    let state = 'name'
    let formData = {
        name: '',
        birthday: '',
        gender: 1,
        searchfor: 1,
        minage: 18,
        maxage: 99,
        distance: 0
    }

    let updateUser = async () => {
        let { data } = await supabase
            .from('user')
            .update({
                ...formData,
                state: 'DONE'
            })
            .eq('id', $user.id)
        user.set(data[0])
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
