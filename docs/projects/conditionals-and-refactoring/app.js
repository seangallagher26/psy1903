let response = prompt('What is 4+6?');
let correctAnswer = 'The answer is 10.'

let feedback = ''

if (response == 10) {
    feedback = 'You got it correct!';
} else if (response > 8 && response < 12)
// could also say else if (response == 9 || response == 11), but this is less clean
{
    feedback = 'You almost got it correct!';
} else {
    feedback = 'You got it incorrect.';
}

alert(feedback + 'The correct answer is 10!')

// could also use this if we always want it to end with this:
// alert('The expected answer is 10!');

// using variables makes it easier to change info for all sources

