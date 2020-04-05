
const users = [
    { id: 'wanghaoran', name: "王浩然" },
    { id: 'duanyu', name: "段誉" },
    { id: 'wangyuyan', name: "王语嫣" },
    { id: 'xuzhu', name: "虚竹" },
    { id: 'wanglihong', name: "王力宏" },
]

const x = users.map(user => {
    return { [user.id]: user.name + 'ABC' }
})


console.log(x)