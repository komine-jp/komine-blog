function checkSpecial(o: any) {
  return Object.prototype.toString.call(o)
}

function deepClone(obj: any) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const specialType = checkSpecial(obj)

  if (specialType === '[object RegExp]' || specialType === '[object Date]') {
    return obj
  }

  let result: any = {}

  if (Array.isArray(obj)) {
    result = []
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

export default deepClone