/* function celsiusToFahrenheit(celsius) {
    let fahrenheit = (celsius * 1.8) + 32;
    return fahrenheit;
}
console.log(celsiusToFahrenheit(10)); */

/* function convertTemp(temp, convertTo) {
    if (convertTo == 'f') {
        let fahrenheit = (temp * 1.8) + 32;
        return fahrenheit;
    } else {
        let celsius = (temp - 32) / 1.8;
        return celsius;
    }

}

console.log(convertTemp(10, 'c')) */


/* function getWordLengths(words) {
    let lengths = []
    for (let word of words) {
        lengths.push(word.length);
    }
    return lengths
}
let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getWordLengths(words)); */

/* function getLongestWord() {
    let longestWord = '';
    for (let word of words) {
        let wordLength = word.length;
        if (wordLength > longestWord.length) {
            longestWord = word;
        }
    }
    return longestWord;
}

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getLongestWord(words)); */


function getOddNumbers(numbers) {
    let results = [];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 != 0) {
            results[results.length] = numbers[i];
        }
    }
    return results;
}

console.log(getOddNumbers([1, 2, 3, 4, 5]))