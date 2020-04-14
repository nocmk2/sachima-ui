const mock_users = [
    { id: 'wanghaoran', name: "王浩然" },
    { id: 'duanyu', name: "段誉" },
    { id: 'wangyuyan', name: "王语嫣" },
    { id: 'xuzhu', name: "虚竹" },
    { id: 'wanglihong', name: "王力宏" },
    { id: 'admin', name: '管理员' }
]
const mock_roles = [
    { id: 'administrator', name: '管理员' },
    { id: 'caiwu', name: "财务部员工" },
    { id: 'shangwu', name: "商务部员工" },
    { id: 'fengxian', name: "风险部员工" },
    { id: 'fengxianadmin', name: "风险部经理" },

]
const mock_objects = [
    { id: 'Maps', name: "地图模块" },
    { id: 'r0098', name: "报表r0098" },
    { id: 'ThreeDemo', name: "ThreeDemo模块" }
]

const mock_g_userrole = [
    { user: 'wanghaoran', role: 'caiwu' },
    { user: 'wanghaoran', role: 'fengxian' },
    { user: 'duanyu', role: 'fengxian' },
    { user: 'xuzhu', role: 'shangwu' },
    { user: 'admin', role: 'administrator' }

]
const mock_p_roleobjectaction = [
    { role: 'caiwu', obj: 'r0098', action: 'write' },
    { role: 'shangwu', obj: 'Maps', action: 'read' },
    { role: 'fengxian', obj: 'r0098', action: 'write' },
    { role: 'fengxian', obj: 'ThreeDemo', action: 'write' },
    { role: 'administrator', obj: 'r0098', action: 'write' },
    { role: 'administrator', obj: 'Maps', action: 'write' },
    { role: 'administrator', obj: 'r0098', action: 'write' },
    { role: 'administrator', obj: 'ThreeDemo', action: 'write' }
]

export { mock_g_userrole, mock_objects, mock_p_roleobjectaction, mock_roles, mock_users }