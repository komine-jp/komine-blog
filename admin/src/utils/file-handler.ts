const MAXSIZE = 1024 * 1024 * 2 //最大2M

export function convertBase64UrlToBlob(urlData: any, type: any) {
  //将Base64转成Blob
  const bytes = window.atob(urlData.split(',')[1]) //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type })
}

export function compressionImg(file: File, size = MAXSIZE) {
  return new Promise(resolve => {
    const fileName = file.name
    const image = new Image()
    //读取客户端上的文件
    const reader = new FileReader() //创建一个canvas
    const canvas = document.createElement('canvas') //返回一个用于在画布上绘图的环境
    const ctx: any = canvas.getContext('2d') //用文件读取对象进行读取
    reader.readAsDataURL(file)
    //读取完成后监听
    reader.onload = (e: any) => {
      const url = e.target.result //读取到的文件内容
      image.src = url //reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
    }
    image.onload = () => {
      const width = image.naturalWidth
      const height = image.naturalHeight
      //判断2000的大小
      if (file.size <= size && width < 2000 && height < 2000) {
        return resolve({
          src: file,
          fileName,
          width,
          height,
          base64: image.src,
        })
      }
      if (width > height) {
        canvas.width = 2000
        canvas.height = (2000 * height) / width
      } else {
        canvas.width = (2000 * width) / height
        canvas.height = 2000
      }
      ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
      const value = canvas.toDataURL(file.type || 'image/jpeg', 0.7) //将绘制的canvans再转成base64的url
      const f = convertBase64UrlToBlob(value, file.type || 'image/jpeg') //将base64的url再转成文件格式
      return resolve({
        src: f, // 上传时使用formdata进行append
        fileName,
        width: canvas.width,
        height: canvas.height,
        base64: value,
      })
    }
  })
}