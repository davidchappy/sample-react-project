// Find center of canvas - deprecated. 10-25-17
// TEST THIS
export function findCanvasCenter(type = null) {
  const canvas = document.querySelector('canvas')

  // let height = canvas.clientHeight / 2
  let height = canvas.clientHeight / 1.1

  // let height = canvas.clientHeight
  // if (type === 'top') {
  //   height /= 2
  // } else if (type === 'bottom') {
  //   height *= 1.5
  // }

  const left = canvas.getBoundingClientRect().left
  const top = canvas.getBoundingClientRect().top
  const centerX = (canvas.clientWidth / 2) + left
  const centerY = (height / 2) + top

  return { x: centerX, y: centerY }
}