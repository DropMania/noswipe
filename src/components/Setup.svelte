<script>
    import { Tabs, Tab } from 'smelte'
</script>

<Tabs
    selected="1"
    loading={false}
    class="bg-gray-200 shadow-sm"
    classes="absolute bottom-0 w-full border-t-2 border-black"
    tabButtonClasses="text-black"
    let:selected
    color="primary"
    items={[
        { id: '1', text: 'Name', icon: 'alarm_on' },
        { id: '2', text: 'Birthday', icon: 'bug_report' },
        { id: '3', text: 'Looking for', icon: 'eject' }
    ]}
>
    <div
        slot="content"
        class="flex items-center content-center overflow-hidden w-full  h-full"
    >
        <Tab id="1" {selected}>Name</Tab>
        <Tab id="2" {selected}>Birthday</Tab>
        <Tab id="3" {selected}>Looking for</Tab>
    </div>
</Tabs>
