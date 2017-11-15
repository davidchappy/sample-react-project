// Capitalize first letter of string
// TEST THIS
export function capFirst(string) {
  let newStringArray = []
  for (let i=0; i < string.length; i++) {
    const letter = string[i]
    if (i === 0) {
      newStringArray.push(letter.toUpperCase())
    } else {
      newStringArray.push(letter.toLowerCase())
    }
    
  }
  return newStringArray.join('')
  // return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get coordinates from an svg element's transform/translate attribute
// TEST THIS's
export function parseTranslateAttribute(svgElement) {
  let string = svgElement.getAttribute('transform')
  if (string) {
    string = string.replace("translate(", "")
    string = string.replace(")", "")
    const nums = string.split(",")
    const x = Number(nums[0].trim())
    const y = Number(nums[1].trim())
    return { x, y }
  } else {
    return null
  }
}