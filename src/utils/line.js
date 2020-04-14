import LeaderLine from 'leader-line'

const linecolors = {
    purple: { color: 'purple', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true },
    hotpink: { color: 'hotpink', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true },
    gray: { color: 'gray', size: 3, dash: { animation: false }, startPlugColor: 'black', gradient: true },
    red: { color: 'red', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true },
    blue: { color: 'blue', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true }
}

// {"user1":[0,1,5,4]}  number is the position of lines
let paths = {}
// {new LeaderLine,new LeaderLine}
let lines = []
let animation = false

export const DisposeLine = () => {
    lines.forEach(line => {
        line.remove()
    })
    lines = []
    paths = {}
}


export const DrawLineX = (refs, relation) => {

    for (let r in refs) {
        paths[r] = new Set()
    }

    relation.forEach(r => {
        let line = new LeaderLine(
            refs[r.start].current,
            refs[r.end].current,
            r.type === 'roleobject' ? linecolors.gray : linecolors.red
        )
        const len = lines.push(line)

        paths[r.start].add(len - 1) // Set must use primitive to duplicate items,we use index of lines
        paths[r.end].add(len - 1)
    })
}

export const ToggleAnimateRelativeLine = (id) => {
    // console.log(`going to animate ${id}`)
    if (paths[id] === undefined || lines.length === 0) return
    paths[id].forEach(pos => {
        lines[pos].setOptions({ dash: { animation: !animation } })
    })
    animation = !animation
}
