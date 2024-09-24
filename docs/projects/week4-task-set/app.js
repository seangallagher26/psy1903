/* function celsiusToFahrenheit(celsius) {
    let fahrenheit = (celsius * 1.8) + 32;
    return fahrenheit;
}
console.log(celsiusToFahrenheit(10)); */

function convertTemp(temp, convertTo) {
    if (convertTo == 'f') {
        let fahrenheit = (temp * 1.8) + 32;
        return fahrenheit;
    } else {
        let celsius = (temp - 32) / 1.8;
        return celsius;
    }

}

console.log(convertTemp(10, 'c'))