import { formatDate } from '@/utils/date'
//列表数据格式化
export function formatList(list: Array<any>, fotmat: string) {
  const categories = new Array<any>()
  const seriesData = new Array<any>()
  if (list && list.length > 0) {
    list.forEach((_: any) => {
      categories.push(formatDate(_.time, fotmat))
      seriesData.push(_.data)
    })
  }
  return { categories, seriesData }
}
