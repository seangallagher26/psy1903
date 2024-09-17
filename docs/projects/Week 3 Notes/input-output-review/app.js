// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
// let equation = document.getElementById('equation'); // this 'equation' is in HTML
let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

// equation.innerHTML = 'What is ' + num1 + ' + ' + num2 + '?'; // puts this below the original words



// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    //STOP TIMER HERE

    //Calculate response time

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    //hide the form, incl. instructions
    form.style.display = 'none';
});
