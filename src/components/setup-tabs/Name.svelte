<script>
    import { TextField, Button, ProgressCircular, Select } from 'smelte'
    import { user } from '../../store'
    import { slide } from 'svelte/transition'
    import { v4 as uuidv4 } from 'uuid'
    import supabase from '../../supabase'
    export let formData
    export let genders
    export let state
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
        uploading = false
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
</script>

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
