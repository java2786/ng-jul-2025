// factorial of number
// num -> 1 * 2 * 3 * .... n-1 * n

let num = 7;
let factorial = 1;

for(let i=1;i<=num;i=i+1){
    factorial = factorial * i;
    console.log(`I: ${i}, factorial: ${factorial}`);
}
