function tokenizer(input) {
    let current = 0
    // let tokens = []

    while (current < input.length) {
        let char = input[current]
        console.log(char)
        current++
    }
}

const code = `
function tokenizer(input) {
let current = 0
let tokens = []

while (current < input.length) {
    let char = input[current]
    console.log(char)
}
}
`
tokenizer(code)
