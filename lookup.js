
function addToLookup (lookup, key, value) {
  const list = lookup[key]
  if (!list) {
    lookup[key] = [value]
  } else{
    list.push(value)
  }
}
function addToLookupSet (lookup, key, value) {
  const set = lookup[key]
  if (!set) {
    lookup[key] = new Set([value])
  } else{
    set.add(value)
  }
}
function countToLookup (lookup, key) {
  lookup[key] = (lookup[key] ?? 0) + 1;
}

module.exports = {
  addToLookup,
  addToLookupSet,
  countToLookup,
}
