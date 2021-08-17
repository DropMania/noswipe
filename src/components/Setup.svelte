<script>

    import { Tabs, Tab, TextField, Button } from 'smelte'
    import supabase from '../supabase'
    let uploadFile = () => {
        let input = document.createElement('input')
        input.type= 'file'
        input.click()
        input.onchange = async(e)=>{
            let data = await supabase.storage.from('profile-images').upload('1.jpeg',input.files[0])
            console.log(data)
        }
    }
</script>

<Tabs
    selected=1
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
            <div class="flex flex-col gap-y-10 h-full w-full justify-center items-center mt-10">
                <Button on:click={uploadFile}>Upload Profile Image</Button>
                <TextField label='Enter your name' 
                />
            </div>
        </Tab>
        <Tab id="2" {selected}>Birthday</Tab>
        <Tab id="3" {selected}>Looking for</Tab>
    </div>
</Tabs>
