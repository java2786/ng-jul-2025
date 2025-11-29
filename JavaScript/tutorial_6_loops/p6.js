// Print sum of all odds numbers from 1 - N

let n = 4;
let sum = 0;
for(let i=1;i<=n;i++){

    if(i%2==0){
        // not consuming even number
    } else {
        sum = sum + i;
    }

    // if(i%2!=0){
    //     sum = sum + i;
    // }
}

console.log(sum);

