<script>
    import { Tabs, Tab, TextField, Button, ProgressCircular } from 'smelte'
    import supabase from '../supabase'
    import { v4 as uuidv4 } from 'uuid'

    let noImgYet = false
    let uploading = false
    let currentImgPath = ''
    //set a default profile image

    let image = 'assets/blank.jpg'
    let checkImage = async () => {
        uploading = true
        let { data } = await supabase
            .from('profile_image')
            .select('*')
            .eq('user', supabase.auth.user().id)
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
                user: supabase.auth.user().id
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

<Tabs
    selected="1"
    loading={false}
    class="bg-black shadow-sm "
    classes="absolute bottom-0 w-full border-t-2 border-gray-800"
    tabButtonClasses="text-white"
    color="primary"
    let:selected
    items={[
        { id: '1', text: 'Name', icon: 'person' },
        { id: '2', text: 'Birthday', icon: 'today' },
        { id: '3', text: 'Looking for', icon: 'face' }
    ]}
>
    <div
        slot="content"
        class="flex items-center content-center overflow-hidden w-full  h-full"
    >
        <Tab id="1" {selected}>
            <div
                class="flex flex-col gap-y-10 h-full w-full justify-center items-center mt-10"
            >
                <div class="relative">
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
                        <div class="absolute top-20 left-20">
                            <ProgressCircular />
                        </div>
                    {/if}
                </div>

                {#if noImgYet}
                    <Button on:click={uploadFile}>Upload Profile Image</Button>
                {/if}
                <TextField label="Enter your name" />
            </div>
        </Tab>
        <Tab id="2" {selected}>Birthday</Tab>
        <Tab id="3" {selected}>Looking for</Tab>
    </div>
</Tabs>
