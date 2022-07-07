import notification, { IconType, NotificationArgsProps } from 'ant-design-vue/es/notification'

let messageInstance: any

function messageFn(opt: NotificationArgsProps, fn: IconType) {
  if (messageInstance) {
    notification.destroy()
  }
  messageInstance = notification[fn]
  return messageInstance(opt)
}

const message = {
  success: (options: NotificationArgsProps) => messageFn(options, 'success'),
  error: (options: NotificationArgsProps) => messageFn(options, 'error'),
  info: (options: NotificationArgsProps) => messageFn(options, 'info'),
  warning: (options: NotificationArgsProps) => messageFn(options, 'warning'),
}

export default message
