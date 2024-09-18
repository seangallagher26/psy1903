let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let start = Date.now();

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;


form.addEventListener('submit', function (event) {

    event.preventDefault();

    let stop = Date.now();

    let responseTime = ((stop - start) / 1000)

    let response = form.elements['response'].value;

    if (response == num1 + num2) {
        results.innerHTML = 'You answered ' + response + ' (correct) in ' + responseTime + ' seconds!';
    } else {
        results.innerHTML = 'You answered ' + response + ' (incorrect) in ' + responseTime + ' seconds.';
    }


    //hide the form, incl. instructions
    form.style.display = 'none';
});