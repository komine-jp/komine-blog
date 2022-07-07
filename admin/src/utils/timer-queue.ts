interface Queue {
  [index: string]: () => void
}

export default class Timer {
  queue: Queue
  timer: any
  constructor() {
    this.queue = {}
    this.timer = null
  }

  add(name: string, fn: () => void) {
    this.queue[name] = fn
  }

  remove(name: string) {
    delete this.queue[name]
  }

  start() {
    this.timer = setInterval(() => {
      Object.values(this.queue).forEach((fn) => {
        fn()
      })
    }, 1000)
  }
  removeAll() {
    this.queue = {}
  }
  stop() {
    clearInterval(this.timer)
    this.timer = null
  }
}
