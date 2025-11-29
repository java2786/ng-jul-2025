// Count evens and odds from 1 - N

let n = 11;     // 1 2 3 4 5 6 7 8 9 10 11
let evens = 0;  // 5
let odds = 0;  // 6
let evenSum = 0;
let oddSum = 0;

for(let i=1;i<=n;i++){

    if(i%2==0){
        // even found
        evens = evens + 1;
        evenSum = evenSum + i;
    } else {
        // odd found
        odds = odds + 1;
        oddSum = oddSum + i;
    }

}

console.log(`Total even numbers: ${evens} and sum is ${evenSum}`);
console.log(`Total odd numbers: ${odds} and sum is ${oddSum}`);

