// TEST THIS
export function rgbToHex(rgbArray) {
  const r = Number(rgbArray[0])
  const g = Number(rgbArray[1])
  const b = Number(rgbArray[2])
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}