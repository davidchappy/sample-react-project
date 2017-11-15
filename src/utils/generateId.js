// Naive method to generate an id from a set; 
//  to be replaced by backend
// TEST THIS
export function generateId(set) {
  if (set.length > 0) {
    const ids = set.map((item, i) => {
      return Number(item.id)
    })
    const max = Math.max.apply(null, ids)
    return max + 1
  } else {
    return 1
  }
}

export default generateId