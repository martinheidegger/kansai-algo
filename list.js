const { readFileSync } = require('fs')
const { uniquePermutations, allPermutations, validPermutations } = require('./permutation');
const { addToLookup, addToLookupSet, countToLookup } = require('./lookup');
const words10k = require('./words10k.json')
const wordsAlpha = readFileSync('./words_alpha.txt', 'utf8').split(/\r\n/)
const allWords = wordsAlpha

const PREFIX = { min: 1, max: 3 }
const SUFFIX = { min: 2, max: 6 }
const MIN_LEN = PREFIX.min + SUFFIX.min
const MAX_LEN = PREFIX.max + SUFFIX.max
const words = allWords
  .filter(word => word.length >= MIN_LEN && word.length <= MAX_LEN)
console.log(words.length)

const suffixesByPrefix = {}
const suffixSetsByPrefix = {}
const prefixesBySuffix = {}
for (const word of words) {
  const max = Math.min(Math.max(word.length - SUFFIX.min, 1), PREFIX.max);
  for (let i = SUFFIX.min; i <= max; i++) {
    const prefix = word.substring(0, i);
    const suffix = word.substring(i);
    addToLookup(suffixesByPrefix, prefix, suffix);
    addToLookupSet(suffixSetsByPrefix, prefix, suffix);
    addToLookup(prefixesBySuffix, suffix, prefix);
  }
}

console.log('[')
let first = true
for (let [prefix, centerSuffixes] of Object.entries(suffixesByPrefix)) {
  // Center needs to have 4 suffixes, anything less than 4 can be ignored
  if (centerSuffixes.length < 4) continue
  centerSuffixes = centerSuffixes.filter(
    // Remove suffixes that themselves do not have at least 5 other prefixes as
    // every suffix node has 6 edges
    suffix => prefixesBySuffix[suffix].length >= 6
  )
  for (const suffixes of uniquePermutations(centerSuffixes, 4)) {
    const suffixPrefixes = {}
    for (const suffix of suffixes) {
      for (const l2prefix of prefixesBySuffix[suffix]) {
        if (l2prefix === prefix) continue
        countToLookup(suffixPrefixes, l2prefix)
      }
    }
    // Use the corners
    const validSuffixPrefixes = Object
      .entries(suffixPrefixes)
      .filter(([l2prefix, count]) => count >= 2)
    const l2prefixes = validSuffixPrefixes
      .filter(([l2prefix, count]) => count >= 3)
      .map(([l2prefix]) => ({
        suffixSet: suffixSetsByPrefix[l2prefix],
        l2prefix,
      }));
    const [X, Y, Z, W] = suffixes;
    for (const l2prefixSet of uniquePermutations(l2prefixes, 4)) {
      const [{ suffixSet: a }, { suffixSet: b }, { suffixSet: c }, { suffixSet: d }] = l2prefixSet
      if (!(
        a.has(W) && a.has(X) && a.has(Y) && 
        b.has(X) && b.has(Y) && b.has(Z) && 
        c.has(Y) && c.has(Z) && c.has(W) && 
        d.has(Z) && d.has(W) && d.has(X)
      )) {
        continue;
      }
      const l3prefixes = validSuffixPrefixes
        .filter(([l3prefix, count]) => !l2prefixSet.find(({ l2prefix }) => l2prefix === l3prefix))
        .map(([l3prefix]) => ({
          suffixSet: suffixSetsByPrefix[l3prefix],
          l3prefix,
        }));
      for (const l3prefixSet of uniquePermutations(l3prefixes, 4)) {
        const [{ suffixSet: A }, { suffixSet: B }, { suffixSet: C }, { suffixSet: D }] = l3prefixSet
        if (
          A.has(X) && A.has(Y) &&
          B.has(Y) && B.has(Z) &&
          C.has(Z) && C.has(W) &&
          D.has(W) && D.has(X)
        ) {
          const l2prefixwords = l2prefixSet.map(({ l2prefix }) => l2prefix)
          const l3prefixwords = l3prefixSet.map(({ l3prefix }) => l3prefix)
          const prefixes = [
            prefix,
            ...l2prefixwords,
            ...l3prefixwords
          ]
          console.log((first ? '' : ',') + JSON.stringify({ suffixes, prefixes }))
          first = false;
          break;
        }
      }
    }
  }
}
console.log(']')

