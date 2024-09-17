alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

let number1 = Math.floor(Math.random() * 10) + 1;
let number2 = Math.floor(Math.random() * 10) + 1;

let start = Date.now();
let response1 = prompt('What is ' + number1 + ' + ' + number2);
let end = Date.now();
let responseTime = ((end - start) / 1000)
alert('You answered ' + response1 + ' in ' + responseTime + ' seconds');

let number3 = Math.floor(Math.random() * 10) + 1;
let number4 = Math.floor(Math.random() * 10) + 1;

let start2 = Date.now();
let response2 = prompt('What is ' + number3 + ' + ' + number4);
let end2 = Date.now();
let responseTime2 = ((end2 - start2) / 1000)
alert('You answered ' + response2 + ' in ' + responseTime2 + ' seconds');

let number5 = Math.floor(Math.random() * 10) + 1;
let number6 = Math.floor(Math.random() * 10) + 1;

let start3 = Date.now();
let response3 = prompt('What is ' + number5 + ' + ' + number6);
let end3 = Date.now()
let responseTime3 = ((end3 - start3) / 1000)
alert('You answered ' + response3 + ' in ' + responseTime3 + ' seconds');

alert("Thank you for your participation!")


const courseName = "Programming for Psychologists";
console.log(courseName.toUpperCase());
console.log(courseName.indexOf("Psychologists"));
console.log(courseName.replace("Programming", "Coding"));
