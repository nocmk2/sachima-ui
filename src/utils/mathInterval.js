export const getMathInterval = (express) => {
    let inf = 0
    let his = [-10, 10]
    let temp = express.replace(" ", "")
    let left = temp[0]
    let right = temp[temp.length - 1]
    let s = temp.substr(1, temp.length - 2)
    let a = s.split(",")
    let interval = [Number(a[0]), Number(a[1])]

    if (a[0] === "-inf") {
        inf = -1
        interval = interval[1]
        his = [0, interval]
    }

    if (a[1] === "inf") {
        inf = 1
        interval = interval[0]
        his = [interval, 100]
    }
    return { interval: interval, inf: inf, left: left, right: right, his: his, min: -100, max: 100 }
}


const expressToNumber = (express, withInf = true) => {
    let s = express.substr(1, express.length - 2)
    let ns = s.split(",")
    let left = Number(ns[0])
    let right = Number(ns[1])
    if (ns[0] === "-inf") {
        if (withInf) {
            left = -Infinity
        } else {
            left = Number(ns[1])
        }
    } else if (ns[1] === "inf") {
        if (withInf) {
            right = Infinity
        } else {
            right = Number(ns[0])
        }
    }
    return [left, right]
}

export const sortMathIntervalBin = (a, b) => {
    if (expressToNumber(a)[0] > expressToNumber(b)[0]) {
        return 1
    }
    if (expressToNumber(a)[0] < expressToNumber(b)[0]) {
        return -1
    }
    return 0
}

export const getMinMax = (bin) => {
    // bin = {
    //     "[1,5)": 10,
    //     "[10,15)": 45,
    //     "[15,20)": 50,
    //     "[20,25)": 65,
    //     "[25,40)": 75,
    //     "[40,inf)": 80,
    //     "[5,10)": 30
    // }
    // distance = 40
    // x * (2 / 3)=40
    let param = 0.5
    let all = []
    Object.keys(bin).forEach((item, index) => {
        all = all.concat(expressToNumber(item, false))
    })
    let max = Math.max.apply(Math, all)
    let min = Math.min.apply(Math, all)
    // console.log(min, max)
    // console.log(min - ((max - min) * 0.5 * 0.5))
    return [min - ((max - min) * param * 0.5), max + ((max - min) * param * 0.5)]
}