// print digits of a given number

let num = 123;

// let last = num % 10; // 3
// num = parseInt(num / 10); // 12
// console.log(last);

// last = num % 10; // 2
// num = parseInt(num / 10); // 1
// console.log(last);

// last = num % 10; // 1
// num = parseInt(num / 10); // 0
// console.log(last);

while(num>0){
    let last = num % 10; 
    console.log(last);
    num = parseInt(num / 10); 
}