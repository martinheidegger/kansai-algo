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
function * _validPermutations (list, len, stack, stackIndex, depth, maxDepth, check) {
  for (let i = 0; i < len; i++) {
    const entry = list[i]
    if (!check(entry, stackIndex)) {
      continue
    }
    stack[stackIndex] = entry
    if (depth === maxDepth) {
      yield stack
    } else {
      for (const res of _validPermutations(list, len, stack, depth, depth + 1, maxDepth)) {
        yield res
      }
    }
  }
}
function * validPermutations (list, check, maxDepth = list.length) {
  if (list.length < maxDepth) {
    return
  }
  for (const stack of _validPermutations(list, list.length, new Array(maxDepth), 0, 1, maxDepth, check)) {
    yield stack
  }
}

function * allPermutations(array, length = array.length) {
  const c = new Array(length).fill(0);
  let i = 0;

  yield array;

  while (i < length) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        [array[0], array[i]] = [array[i], array[0]];
      } else {
        [array[c[i]], array[i]] = [array[i], array[c[i]]];
      }
      yield array;
      c[i] += 1;
      i = 0;
    } else {
      c[i] = 0;
      i += 1;
    }
  }
}

function * allPermutations(array, length = array.length) {
  const c = new Array(length).fill(0);
  let i = 0;

  yield array;

  while (i < length) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        [array[0], array[i]] = [array[i], array[0]];
      } else {
        [array[c[i]], array[i]] = [array[i], array[c[i]]];
      }
      yield array;
      c[i] += 1;
      i = 0;
    } else {
      c[i] = 0;
      i += 1;
    }
  }
}


module.exports = {
  uniquePermutations,
  validPermutations,
  allPermutations,
}
