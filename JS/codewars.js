/**
 The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string.
 Ignore capitalization when determining if a character is a duplicate.
 "din"      =>  "((("
 "recede"   =>  "()()()"
 "Success"  =>  ")())())"
 "(( @"     =>  "))(("
 */

const duplicateEncode = word => {
    return word
        .toLowerCase()
        .replace(/./g, m => word.indexOf(m) == word.lastIndexOf(m) ? '(' : ')');
};


/**
 Given an array, find the int that appears an odd number of times.
 There will always be only one integer that appears an odd number of times.
 */

// #1:
const findOdd = arr => {
    const valuesData = arr.reduce((acc, cur) => {
        !acc[cur] ? acc[cur] = 1 : acc[cur]++;

        return acc;
    }, {});

    return +Object.keys(valuesData).find(key => valuesData[key] % 2 !== 0);
}

// #2:
const findOdd = arr => arr.reduce((a, b) => a ^ b);
