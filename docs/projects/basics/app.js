// Define a variable to hold our experiment name
let experiment = 'Stroop';
let trialCountMax = 20;
let colors = ['red', 'green', 'blue'];

// TODO: Randomize Colors
alert('Welcome to the ' + experiment + 'experiment!');

trialCountMax = 40;

// At the halfway point we will display a pause screen
let halfWayCount = trialCountMax / 2;

console.log(halfWayCount); // Expected: 20

let correct = true;
console.log(typeof correct);

console.log(10 <= 15); // true

// update to practice commit

// Week 2
// What if we want to ask our viewers a math queston?

prompt('What is 5+3');
let response = prompt('What is 5+3'); //We want to collect a response to this 
console.log(response); //We can now see the response in inspect

response = prompt('What is 5 + 5'); //It will then ask this question next
console.log(response)

/* We could also change them to response1/2, in which case we'll have two separate
variables that we could refer back to later
e.g.

let response1 = prompt ('What is 5+3'); 
console.log(response1); 
let response2 = prompt('What is 5 + 5');
console.log(response2)

you also don't need to use the let keyword! But it is a good practice, and 
we will run into 'scope' later on down the line... so keep using it */


const courseName = "Programming for Psychologists";
console.log(courseName.toUpperCase());
console.log(courseName.indexOf("Psychologists"));
console.log(courseName.replace("Programming", "Coding"));






