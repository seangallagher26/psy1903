alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

let start = Date.now();
let response1 = prompt('What is 2 + 5');
let end = Date.now();
let responseTime = ((end - start) / 1000)
alert('You answered ' + response1 + ' in ' + responseTime + ' seconds');

let start2 = Date.now();
let response2 = prompt('What is 7 + 1');
let end2 = Date.now();
let responseTime2 = ((end2 - start2) / 1000)
alert('You answered ' + response2 + ' in ' + responseTime2 + ' seconds');

let start3 = Date.now();
let response3 = prompt('What is 2 + 2');
let end3 = Date.now()
let responseTime3 = ((end3 - start3) / 1000)
alert('You answered ' + response3 + ' in ' + responseTime3 + ' seconds');

alert("Thank you for your participation!")