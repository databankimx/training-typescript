// A palindrome reads the same forwards and backwards. Words of length 0 or 1 are palindromes by definition.
function isPalindrome(text: string): boolean {
  if (text.length <= 1) {
    return true;
  }
  if (text[0] !== text[text.length - 1]) {
    return false;
  }
  return isPalindrome(text.slice(1, -1));
}

console.log(isPalindrome("racecar"));
console.log(isPalindrome("recursion"));
