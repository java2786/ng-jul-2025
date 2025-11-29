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

// 7 Input marks of 3 subjects and print average, percentage.
let a = parseInt(prompt("Enter Hindi marks"));
let b = parseInt(prompt("Enter English marks"));
let c = prompt("Enter Math marks")
c = +c;
let d = prompt("Enter Science marks")
d = parseInt(d)

let max = 150;

sum = a+b+c+d;
average = sum/4;
percentage = sum/(max*4) * 100;

console.log("Average: "+average);
console.log("Percentage: "+percentage);