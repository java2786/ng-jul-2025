    // Take two numbers as input and print their sum, difference, product, and quotient.
    // Convert temperature from Celsius to Fahrenheit.
    // Input two numbers and print which one is greater using only comparison operators.
    // Input marks of 3 subjects and print average, percentage.


// 1. 
let a = prompt("Enter first number"); // 33
let b = prompt("Enter second number"); // 3

// if(typeof a == 'number' && typeof b == 'number'){
if(isNaN(a)===false && isNaN(b)===false){
    a = parseInt(a);
    b = +b;
    // console.log(`${+a} + ${parseInt(b)} = ${a+b}`);
    console.log(`${a} + ${b} = ${a+b}`);
    console.log(`${a} - ${b} = ${a-b}`);
    console.log(`${a} * ${b} = ${a*b}`);
    console.log(`${a} / ${b} = ${a/b}`);
} else {
    console.log("Invalid input");
}


// Convert temperature from Celsius to Fahrenheit.
let c = 35;
let f = (c * 9/5) + 32;
// F = (°C × 9/5) + 32
console.log(`${c}°C is equivalent to ${f}°F`);


// Input two numbers and print which one is greater using only comparison operators.
let m = 5;
let n = 2;
let p = 4;

if(m>n){
    console.log(`${m} is greater than ${n}`);
} else if(n>m){
    console.log(`${n} is greater than ${m}`);
} else {
    console.log(`Both are same and value is ${m}`)
}


// Input marks of 3 subjects and print average, percentage.

let marks1 = 76;
let marks2 = 77;
let marks3 = 83;

console.log(`Average score: ${(marks1+marks2+marks3)/3}`);
