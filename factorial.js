module.exports = function fact(num) {
  var result = BigInt(num);
  if (num === 0 || num === 1) 
    return 1; 
  while (num > 1) { 
    num--;
    result *= BigInt(num);
  }
  return result;
}
