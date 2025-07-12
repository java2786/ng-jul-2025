// 1. Write a program to take your name and age as input and print them.

let cus_name = prompt("Enter your name");
let age = prompt("Enter your age");

// console.log(cus_name);
// console.log(age);

console.log(`Welcome ${cus_name}, you are ${age} year old.`)


// 2. Input a number and print whether it's even or odd (no if/else, just logic with %).
let num = prompt("Enter a number")

console.log(`is ${num} even number: ${num%2 == 0}`)

if(num%2 == 0){
    console.log(`${num} is even number`)
} else {
    console.log(`${num} is odd number`)
}
