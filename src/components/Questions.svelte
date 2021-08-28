<script>
    import { onMount } from 'svelte'
    import LinearProgress from '@smui/linear-progress'
    import { Button } from 'smelte'
    import { user } from '../store'
    import { slide } from 'svelte/transition'
    import {
        collection,
        getDocs,
        getDoc,
        doc,
        addDoc,
        updateDoc
    } from 'firebase/firestore'
    import { db } from '../firebase'
    import { randomNumbers } from '../utils'
    let questions
    let currentQuestion = 0
    let answers = []
    onMount(async () => {
        let questionsRef = await getDocs(collection(db, 'questions'))
        let nums = randomNumbers(3, 0, questionsRef.docs.length - 1)
        let randomDocs = nums.map((num) => questionsRef.docs[num].id)
        questions = await Promise.all(
            randomDocs.map(async (docId) => ({
                ...(await getDoc(doc(db, 'questions', docId))).data(),
                id: docId
            }))
        )
    })
    let addAnswer = async (answer, question) => {
        answers = [...answers, { answer, question: question.text }]
        console.log(answers)
        if (answers.length === questions.length) {
            $user.state = 'DONE'
            await updateDoc(doc(db, 'users', $user.uid), {
                answers,
                state: 'DONE'
            })
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
                    {questions[currentQuestion].text}
                </div>

                {#each questions[currentQuestion].answers as answer}
                    <Button
                        class="mt-10 h5 rounded p-5 max-w-sm "
                        on:click={addAnswer(answer, questions[currentQuestion])}
                    >
                        {answer}
                    </Button>
                {/each}
            </div>
        {/key}
    {:else}
        <LinearProgress indeterminate />
    {/if}
</div>
