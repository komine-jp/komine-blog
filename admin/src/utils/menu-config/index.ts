export type menuArrayType = {
  name: string
  meta: {
    title: string
    iconClass?: string
  }
  children: Array<menuArrayType>
}

const menus: Array<menuArrayType> = [
  {
    name: 'home',
    meta: {
      iconClass: 'icon-nav-shouye',
      title: '首页',
    },
    children: [],
  },
  {
    name: 'user',
    meta: {
      iconClass: 'icon-nav-wulianjiankong',
      title: '成员',
    },
    children: [
      {
        name: 'info',
        meta: {
          title: '信息管理',
        },
        children: [],
      },
    ],
  },
]

export default menus
