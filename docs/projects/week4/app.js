//let feedback = 'correct';
//let responseTime = 2.4;
//let answer = 25;

//alert(`You are ${feedback}. Answer: ${answer}. Response time: ${responseTime}`);




//Part 1. Functions
// let num1 = getRandomNumber(1, 10)
//  let num2 = getRandomNumber(0, 100)

//function getRandomNumber(min, max) {
//    let randomNumber = Math.floor(Math.random() * max) + min;
//    return randomNumber
//}

// displayRandomNumber();

// function displayRandomNumber() {
//    alert(getRandomNumber(1, 10));
// }

// Arrays
/*let ages = [45, 23, 28, 35, 35];
//-------------0---------1-------2-------3
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];
console.log(names[1]); //'jamal'
names[1] = 'Bob'
names.push('Sara');
console.log(names) */

// Loops

/*
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

let namesThatStartWithA = [];

for (let name of names) {
    if (name.charAt(0) == 'A') {
        namesThatStartWithA.push(name);
    };
}

console.log(namesThatStartWithA);
*/

// Numerical for loops
/* let results = [];

for (let i = 0; i < 3; i++) {
    let number1 = getRandomNumber(1, 10);
    let number2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt(`What is ${number1} + ${number2} ?`);
    let end = Date.now();
    let responseTime = ((end - start) / 1000)

    if (response == number1 + number2) {
        feedback = 'correct';
    } else {
        feedback = 'incorrect';
    }

    results.push([feedback, responseTime]);
    alert(`You answered ${response} (${feedback}) in ${responseTime} seconds`);

}

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}
*/

// Objects
//let participantA = ['Alice', 21, true]

//let participantB = { name: 'Alice', age: 21, consent: true }



// if (participantB.consent) {
//...
// }

/* let person = {
    // Strings
    firstName: 'Elliot',
    lastName: 'Brown',

    // Number
    age: 30,

    // Array
    hobbies: ['reading', 'gaming', 'hiking'],

    // Nested Object
    address: {
        street: '324 Western Ave',
        city: 'Cambridge',
        zipCode: '02139'
    },

    // Functions
    // Observe how the keyword *this* is used in functions to reference other properties within this object
    getFullName: function () {
        return `${this.firstName} ${this.lastName}`;
    },

    greet: function () {
        return `Hello, my name is ${this.getFullName()} and I am ${this.age} years old.`;
    },

    getAddress: function () {
        return `I live at ${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
    },

    getHobbies: function () {
        return `My hobbies include ${this.hobbies.join(', ')}`;
    }
};

// Testing the functions, accessed via dot notation and invoked with parenthesis
console.log(person.greet()); // Hello, my name is Elliot Brown and I am 30 years old.

console.log(person.getAddress()); // I live at 324 Western Ave, Cambridge 02139
console.log(person.getHobbies()); // My hobbies include reading, gaming, hiking

// Testing the properties
console.log(person.firstName); // Elliot
console.log(person.age); // 30

console.log(person.getAddress()) */

let results = [];

for (let i = 0; i < 3; i++) {
    let number1 = getRandomNumber(1, 10);
    let number2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt(`What is ${number1} + ${number2} ?`);
    let end = Date.now();
    let responseTime = ((end - start) / 1000)
    let answer = number1 + number2

    if (response == number1 + number2) {
        feedback = 'correct';
    } else {
        feedback = 'incorrect';
    }

    let result = {
        response: response,
        answer: answer,
        feedback: feedback,
        time: responseTime
    }

    results.push(result);
    alert(`You answered ${response} (${feedback}) in ${responseTime} seconds`);

}

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}
console.log(results)
