/* let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let response = prompt('What is ' + num1 + ' + ' + num2 + ' ?');
let correctAnswer = num1 + num2

let feedback = ''

if (response == correctAnswer) {
    feedback = 'You got it correct!';
} else if (response == correctAnswer + 1 || response == correctAnswer - 1) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The correct answer is ' + correctAnswer + '!');
*/

/* let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
if (age >= 12 && age < 18) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
}
*/

let response2 = prompt('Enter A Whole Number')

if (response2 % 2 == 0) {
    alert("You entered a even number.")
} else {
    alert("You entered an odd number.")
}