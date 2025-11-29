let num = 3765238;
let evenCount = 0;
let oddCount = 0;
while(num>0){
    let lastDigit = num%10; // 3
    if(lastDigit%2==0){
        evenCount++; //3
    } else {
        oddCount++;//4
    }
    num = parseInt(num/10); // 0
}

console.log("Even: "+evenCount+", Odd: "+oddCount);
// number -> 3765238
// count even-3, odd-4