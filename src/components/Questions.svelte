<script>
    import supabase from '../supabase.js'
    import { onMount } from 'svelte'
    import LinearProgress from '@smui/linear-progress'
    import { Button } from 'smelte'
    import { user } from '../store'
    import { slide } from 'svelte/transition'
    let questions
    let currentQuestion = 0
    let answers = []
    onMount(async () => {
        questions = (await supabase.rpc('random_questions')).data
    })
    let addAnswer = async (answer, question) => {
        answers = [...answers, { user: $user.id, answer, question }]
        if (answers.length === questions.length) {
            await supabase.from('user_answer').insert(answers)
            let { data } = await supabase
                .from('user')
                .update({
                    state: 'DONE'
                })
                .eq('id', $user.id)
            user.set(data[0])
        } else {
            currentQuestion += 1
        }
    }
</script>

<div class="flex flex-col items-center">
    {#if questions}
        <div class="h4">Answer some Questions</div>
        <div class="body text-gray-500">It will help for better matching</div>
        {#key currentQuestion}
            <div class="mt-20 flex flex-col items-center" transition:slide>
                <div class="bg-gray-300 bg-opacity-25  h5 rounded p-5 max-w-sm">
                    {questions[currentQuestion].question}
                </div>

                {#each questions[currentQuestion].answers as answer}
                    <Button
                        class="mt-10 h5 rounded p-5 max-w-sm "
                        on:click={addAnswer(
                            answer.id,
                            questions[currentQuestion].id
                        )}
                    >
                        {answer.answer}
                    </Button>
                {/each}
            </div>
        {/key}
    {:else}
        <LinearProgress indeterminate />
    {/if}
</div>
