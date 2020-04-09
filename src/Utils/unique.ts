export function mergeObjectsInUnique(array: any[], property: any): any[] {
  const newArray = new Map();

  array.forEach((item: any) => {
    const propertyValue = item[property];
    newArray.has(propertyValue)
      ? newArray.set(propertyValue, { ...item, ...newArray.get(propertyValue) })
      : newArray.set(propertyValue, item);
  });

  return Array.from(newArray.values());
}
