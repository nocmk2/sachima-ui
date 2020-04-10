var movingCount = function (m, n, k) {
    let queue = [[0, 0]]
    let counter = new Set()

    // const sumidx = (n) => {
    //     let NumAry = n.toString().split('')
    //     return Number(NumAry.reduce((a, b) => Number(a) + Number(b)))
    // }

    const sumx = (x, y) => {
        return x % 10 + Math.floor(x / 10) + y % 10 + Math.floor(y / 10)
    }

    while (queue.length) {
        // for (let i = 0; i < 98; i++) {
        // console.log(queue)
        // console.log(counter)
        let cood = queue.shift()
        let colAdd = cood[1] + 1
        let rowAdd = cood[0] + 1
        let simpleheight = cood[0] + colAdd
        // console.log('cood: ' + cood)
        //Right
        // let rightSumIdx = 
        let rightmarkitem = cood[0] * 100 + colAdd
        let ccal = n >= 10 ? sumx(cood[0], colAdd) : simpleheight
        if (ccal <= k && colAdd < n && !counter.has(rightmarkitem)) {
            // console.log('Right push=>' + [cood[0], cood[1] + 1])
            queue.push([cood[0], colAdd])
            counter.add(rightmarkitem)
        }

        let downmarkitem = rowAdd * 100 + cood[1]
        let dcal = m >= 10 ? sumx(rowAdd, cood[1]) : simpleheight
        //Down
        if (dcal <= k && rowAdd < m && !counter.has(downmarkitem)) {
            // console.log('Down push=>' + [cood[0] + 1, cood[1]])
            queue.push([rowAdd, cood[1]])
            counter.add(downmarkitem)
        }

        // for (let item of counter) {
        //     console.log(item)
        // }

    }
    return counter.size + 1
};

let res = movingCount(36, 18, 20)
console.log(res)