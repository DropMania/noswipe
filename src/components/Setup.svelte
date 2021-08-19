<script>
    import {
        TextField,
        Button,
        ProgressCircular,
        DatePicker,
        Slider,
        Select
    } from 'smelte'
    import RangeSlider from '@smui/slider'
    import supabase from '../supabase'
    import { v4 as uuidv4 } from 'uuid'
    import { slide } from 'svelte/transition'
    import { user } from '../store'
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
    let noImgYet = false
    let uploading = false
    let currentImgPath = ''
    let image = 'assets/blank.jpg'
    let checkImage = async () => {
        uploading = true
        let { data } = await supabase
            .from('profile_image')
            .select('*')
            .eq('user', $user.id)
        if (data.length > 0) {
            noImgYet = false
            currentImgPath = data[0].path
            image = supabase.storage
                .from('profile-images')
                .getPublicUrl(currentImgPath).publicURL
        } else {
            noImgYet = true
        }
    }
    checkImage()
    let uploadFile = () => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click()
        input.onchange = async (e) => {
            uploading = true
            let id = uuidv4()
            let extension = input.files[0].name.split('.').pop()
            await supabase.storage
                .from('profile-images')
                .upload(`${id}.${extension}`, input.files[0])
            await supabase.from('profile_image').insert({
                id,
                path: `${id}.${extension}`,
                user: $user.id
            })
            image = supabase.storage
                .from('profile-images')
                .getPublicUrl(`${id}.${extension}`).publicURL
            currentImgPath = id
            noImgYet = false
        }
    }
    let updateImg = () => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click()
        input.onchange = async (e) => {
            uploading = true
            await supabase.storage
                .from('profile-images')
                .update(`${currentImgPath}`, input.files[0])
            image = 'assets/blank.jpg'
            setTimeout(() => {
                image = supabase.storage
                    .from('profile-images')
                    .getPublicUrl(currentImgPath).publicURL
            }, 1)
            noImgYet = false
        }
    }
    let onload = (el) => {
        el.addEventListener('load', () => {
            if (currentImgPath) {
                uploading = false
            }
        })
    }
    let updateUser = async () => {
        let {data} = await supabase.from('user').update({
            ...formData,
            state:'DONE'
        }).eq('id',$user.id)
        user.set(data[0])
    }
</script>

<div
    class="flex flex-col items-center content-center overflow-hidden w-full h-full "
>
    {#if state == 'name'}
        <div
            class="flex flex-col gap-y-10 h-screen w-full justify-start items-center "
            transition:slide
        >
            <div class="relative flex items-center justify-center mt-10">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img
                    src={image}
                    alt="profile image"
                    class="border-2 border-gray-200 mr-3 rounded-full w-60"
                    use:onload
                />
                {#if !noImgYet}
                    <Button
                        icon="edit"
                        classes="absolute top-44 left-44"
                        on:click={updateImg}
                    />
                {/if}
                {#if uploading}
                    <div class="absolute ">
                        <ProgressCircular />
                    </div>
                {/if}
            </div>

            {#if noImgYet}
                <Button on:click={uploadFile}>Upload Profile Image</Button>
            {/if}
            <Select
                items={genders}
                bind:value={formData.gender}
                label="Select your gender"
            />
            <TextField label="Enter your name" bind:value={formData.name} />

            <Button
                disabled={formData.name == ''}
                icon="keyboard_arrow_right"
                on:click={() => (state = 'birthday')}>Go on</Button
            >
        </div>
    {:else if state == 'birthday'}
        <div
            transition:slide
            class="flex flex-col gap-y-10 h-screen w-full justify-start items-center z-0"
        >
        <div class='mt-10'></div>
            <DatePicker
                label="Enter your birthday"
                bind:value={formData.birthday}
            />
            <Button
                disabled={formData.birthday == ''}
                icon="keyboard_arrow_right"
                on:click={() => (state = 'lookin')}>Go on</Button
            >
        
        </div>
    {:else if state == 'lookin'}
        <div
            transition:slide
            class="flex flex-col gap-y-10 h-screen w-full justify-start items-center  z-0"
        >
        <h3 class="mt-10">Looking for</h3>
            <div class="flex flex-col items-center">
                <RangeSlider
                    class="w-56"
                    range
                    min={18}
                    max={99}
                    bind:start={formData.minage}
                    bind:end={formData.maxage}
                />

                Age Range: {formData.minage} - {formData.maxage}
            </div>
            <Select
                items={genders}
                bind:value={formData.searchfor}
                label="Select Gender"
            />
            <div class="flex flex-col items-center">
            <RangeSlider
                    class="w-56"
                    min={0}
                    max={100}
                    bind:value={formData.distance}
                />Range: 
                {#if formData.distance == 0}
                Everywhere
                {:else}
                {formData.distance}km
                {/if}
            </div>
            <Button
                disabled={formData.birthday == ''}
                icon="keyboard_arrow_right"
                
                on:click={updateUser}>Save Data</Button
            >
        </div>
    {/if}
</div>
