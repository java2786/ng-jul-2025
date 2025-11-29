// Factorial of given number 
// 5 = 1 * 2 * 3 * 4 * 5 = 120

let n = 4;  // 1 2 3 4 = 24 
let fact = 1; // 24
for(let i=1;i<=n;i++){
    fact = fact * i;
}

console.log(fact);