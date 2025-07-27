let num = 12345;

// count digits
// let count = 0;

// while(num>0){
//     num = parseInt(num/10);
//     count++;
// }

// console.log(count);


// odd, even - count
let oddCount = 0;
let evenCount = 0;

while(num>0){
    let lastDigit = num%10;
    if(lastDigit%2==0){
        evenCount++;
    } else {
        oddCount++;
    }
    num = parseInt(num/10);
}

console.log("Evens: "+evenCount+", Odds: "+oddCount)