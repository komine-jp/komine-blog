/* 
千分位数字转换
*/

export function toThousands(num: any) {
  if (!num) {
    return '0'
  }
  const intPartFormat = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') //将整数部分逢三一断
  return intPartFormat
}

/* 
params 参数
from 结束数字
to 开始数字
duration 周期（毫秒）
callback 回调
*/

interface NumberAnimateITF {
  from?: number
  to: number
  duration?: number
  callback: (val: any) => void
}
export class NumberAnimate {

  to = 0
  from = 0
  duration = 1000
  callback: (val: any) => void
  timer: any
  frameTime: number = 1000 / 60 // 每一帧用的时间，一秒60帧为requestAnimationFramea的理论刷新率
  totalFrames = 0// 总帧数
  frameStep = 1 // 每一帧增加的数值

  constructor({ from = 0, to, callback }: NumberAnimateITF) {
    this.from = from
    this.to = to
    this.callback = callback

    if (this.to === this.from && this.to == 0) { // 0的判断
      return
    }
    this.start()
  }

  step = () => {
    const { frameStep } = this
    this.from += frameStep
    if (this.from >= this.to) { // 结束
      window.cancelAnimationFrame(this.timer)
      this.callback(this.to)
    } else { // 继续
      this.callback(this.from)
      window.cancelAnimationFrame(this.timer)
      this.timer = window.requestAnimationFrame(this.step)
    }
  }

  start() {
    const { from, to } = this
    if (to < from) {
      throw new Error('起始数字不能大于终止数字')
      return
    }
    const { duration, frameTime } = this
    this.totalFrames = duration / frameTime
    this.frameStep = Math.round((to - from) / this.totalFrames) || 1 // 至少为1
    window.requestAnimationFrame(this.step)
  }
}