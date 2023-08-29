export function deepClone(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const clonedArray = [];
    for (let i = 0; i < obj.length; i++) {
      clonedArray[i] = deepClone(obj[i]);
    }
    return clonedArray;
  }

  const clonedObj: any = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}
