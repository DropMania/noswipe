<script>
    import { TextField, Button, ProgressCircular, Select } from 'smelte'
    import { user } from '../../store'
    import { slide } from 'svelte/transition'
    import { db, storage } from '../../firebase'
    import { doc, updateDoc } from 'firebase/firestore'
    import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
    import { v4 as uuidv4 } from 'uuid'
    export let formData
    export let genders
    export let state
    let noImgYet = false
    let uploading = false
    let currentImgPath = ''
    let image = 'assets/blank.jpg'
    let checkImage = async () => {
        uploading = true
        if ($user.images.length > 0) {
            noImgYet = false
            currentImgPath = `profile-images/${$user.images[0]}`
            let storageRef = ref(storage, currentImgPath)
            image = await getDownloadURL(storageRef)
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
            let fileId = uuidv4()
            let storageRef = ref(storage, `profile-images/${fileId}`)
            await uploadBytes(storageRef, e.target.files[0])
            await updateDoc(doc(db, 'users', $user.uid), {
                images: [fileId]
            })
            image = await getDownloadURL(storageRef)
            currentImgPath = `profile-images/${fileId}`
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
            let storageRef = ref(storage, currentImgPath)
            await uploadBytes(storageRef, e.target.files[0])
            image = 'assets/blank.jpg'
            image = await getDownloadURL(storageRef)
            noImgYet = false
        }
    }
    let onload = (el) => {
        el.addEventListener('load', () => {
            if (currentImgPath && image !== 'assets/blank.jpg') {
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
        disabled={formData.name == '' || formData.gender == ''}
        icon="keyboard_arrow_right"
        on:click={() => (state = 'birthday')}>Go on</Button
    >
</div>
