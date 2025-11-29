// Print sum of all evens numbers from 1 - N

let n = 4;
let sum = 0;
for(let i=1;i<=n;i++){

    if(i%2==0){
        sum = sum + i;
    } else {
        // not consuming odd number
    }
}

console.log(sum);

