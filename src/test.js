function a(one) {
    return function b() {
        console.log(`${one + this.two} `)
    }
}


var caler = {
    two: 2,
    addone: a(1)
}


caler.addone()



