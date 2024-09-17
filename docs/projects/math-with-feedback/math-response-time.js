alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

// trial 1

let number1 = Math.floor(Math.random() * 10) + 1;
let number2 = Math.floor(Math.random() * 10) + 1;

let start = Date.now();
let response1 = prompt('What is ' + number1 + ' + ' + number2);
let end = Date.now();
let responseTime = ((end - start) / 1000)

if (response1 == number1 + number2) {
    alert('You answered ' + response1 + ' (correct) in ' + responseTime + ' seconds');
} else {
    alert('You answered ' + response1 + ' (incorrect) in ' + responseTime + ' seconds');
}


//trial 2 

let number3 = Math.floor(Math.random() * 10) + 1;
let number4 = Math.floor(Math.random() * 10) + 1;

let start2 = Date.now();
let response2 = prompt('What is ' + number3 + ' + ' + number4);
let end2 = Date.now();
let responseTime2 = ((end2 - start2) / 1000)

if (response2 == number3 + number4) {
    alert('You answered ' + response2 + ' (correct) in ' + responseTime2 + ' seconds');
} else {
    alert('You answered ' + response2 + ' (incorrect) in ' + responseTime2 + ' seconds');
}

// trial 3

let number5 = Math.floor(Math.random() * 10) + 1;
let number6 = Math.floor(Math.random() * 10) + 1;

let start3 = Date.now();
let response3 = prompt('What is ' + number5 + ' + ' + number6);
let end3 = Date.now()
let responseTime3 = ((end3 - start3) / 1000)
if (response3 == number5 + number6) {
    alert('You answered ' + response3 + ' (correct) in ' + responseTime3 + ' seconds');
} else {
    alert('You answered ' + response3 + ' (incorrect) in ' + responseTime3 + ' seconds');
}
// thank you

alert("Thank you for your participation!")

