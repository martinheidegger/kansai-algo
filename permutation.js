function * _uniquePermutations (list, len, listIndex, stack, stackIndex, depth, maxDepth) {
  for (let i = listIndex; i < len; i++) {
    stack[stackIndex] = list[i]
    if (depth === maxDepth) {
      yield stack
    } else {
      for (const res of _uniquePermutations(list, len, i + 1, stack, depth, depth + 1, maxDepth)) {
        yield res
      }
    }
  }
}
function * uniquePermutations (list, maxDepth = list.length) {
  if (list.length < maxDepth) {
    return
  }
  for (const stack of _uniquePermutations(list, list.length, 0, new Array(maxDepth), 0, 1, maxDepth)) {
    yield stack
  }
}

module.exports = {
  uniquePermutations
}
