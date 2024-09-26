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


/* function getOddNumbers(numbers) {
    let results = [];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 != 0) {
            results[results.length] = numbers[i];
        }
    }
    return results;
}

console.log(getOddNumbers([1, 2, 3, 4, 5])) */

/* function filterNumbers(numbers, evenOrOdd) {
    let results = [];
    if (evenOrOdd == 'even') {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                results[results.length] = numbers[i];
            }
        }
    } else {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 != 0) {
                results[results.length] = numbers[i];
            }
        }
    }
    return results
}
console.log(filterNumbers([45, 10, 11, 61], 'odd')) */

/* function filterNumbers(numbers, evenOrOdd) {
    let results = [];
    if (evenOrOdd == 'even') {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                results[results.length] = numbers[i];
            }
        }
    } else {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 != 0) {
                results[results.length] = numbers[i];
            }
        }
    }
    return results
}
console.log(filterNumbers([45, 10, 11, 61], 'odd')) */


alert(`
    Welcome to the even/odd response time task.
    
    You are about to see a series of numbers.
    
    If the number you see if EVEN, type the letter "e".
    If the number you see is ODD, type the letter "o".
    
    Please answer as quickly and as accurately as possible.`)




function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber
}

let data = []

for (let i = 0; i < 5; i++) {
    let num1 = getRandomNumber(1, 20)
    let start = Date.now();
    let response = prompt(`
            Number: ${num1}
            Type the letter "e" for EVEN.
            Type the letter "o" for ODD.`);
    let end = Date.now();
    let responseTime = ((end - start) / 1000);

    if ((num1 % 2 == 0 && response == "e") || (num1 % 2 != 0 && response == "o")) {
        answer = 'true';
    } else {
        answer = 'false';
    }
    data.push({
        number: num1,
        response: response,
        correct: answer,
        responseTime: responseTime
    });
}

alert('Thank you for your time!')

console.log(data)