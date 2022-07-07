export function formatDate(date: number, fmt: string) {
  if (!date) {
    return '-'
  }
  const locDate = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (locDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o: { [index: string]: any } = {
    'M+': locDate.getMonth() + 1, // 月份
    'd+': locDate.getDate(), // 日
    'h+': locDate.getHours(), // 小时
    'm+': locDate.getMinutes(), // 分
    's+': locDate.getSeconds(), // 秒
    'q+': Math.floor((locDate.getMonth() + 3) / 3), // 季度
    S: locDate.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (locDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function getDaysToNow(targetTS: number, now?: number) {
  now = now || new Date().getTime()
  const timeDiff = now - targetTS
  return parseInt(timeDiff / 1000 / 60 / 60 / 24 + '')
}
// 处理秒数转时分秒
export function formatNumDate(time: number) {
  const H = Math.floor(time / 3600)
  let timeH = Math.floor(time / 3600).toString()
  time = time - 3600 * H
  let timeM = Math.floor(time / 60).toString()
  let timeS = (time % 60).toString()
  const num0_9 = new RegExp('^[0-9]$')
  if (num0_9.test(timeM)) {
    timeM = `0${timeM}`
  }
  if (num0_9.test(timeH)) {
    timeH = `0${timeH}`
  }
  if (num0_9.test(timeS)) {
    timeS = `0${timeS}`
  }
  return { timeH, timeM, timeS }
}
