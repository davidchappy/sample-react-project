// Arg = array of arrays
export function mergeArrays(arrays) {
  return [].concat(...arrays)
}

// https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
// Tests whether any item is contained in both provided arrays
// TEST THIS
export function sharedBetween(firstArray, secondArray) {
  return secondArray.some(v => {
      return firstArray.contains(v)
  })
}

// https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
// Find index of item in array by a key(attr)/value combo
// TEST THIS
export function findIndexByAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

// https://vincent.billey.me/pure-javascript-immutable-array/
// Like splice but immutable
// TEST THIS
export function immutableSplice(arr, start, deleteCount, ...items) {
  return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ]
}

// Remove an item from a set by id and return set
// TEST THIS
export function removeById(id, collection) {
  return collection.filter(item => {
    return Number(id) !== Number(item.id)
  })
}

export function removeByValue(value, collection) {
  return collection.filter(item => {
    return value !== item
  })
}

// Return collection with selected item replaced
// Immutably update by replacing item in array, chosen by id
// TEST THIS
export function updateById(updatedItem, collection) {
  return collection.map(item => {
    if (Number(item.id) === Number(updatedItem.id)) {
      return updatedItem
    } else {
      return item
    }
  })  
}

// Return SINGLE item by its id
// TEST THIS
export function selectById(id, collection) {
  return collection.filter(item => {
    return Number(id) === Number(item.id)
  })[0]
}

// Return filtered COLLECTION of items by key/value 
// TEST THIS
export function selectByValue(key, value, collection) {
  return collection.filter(item => {
    return item[key] === value
  })
}