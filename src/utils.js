export let randomNumbers = (count, min, max) => {
    let numbers = []
    for (let i = 0; i < count; i++) {
        let number = randomNumber(min, max)
        if (numbers.indexOf(number) === -1) {
            numbers.push(number)
        } else {
            i--
        }
    }
    return numbers
}

export let randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
