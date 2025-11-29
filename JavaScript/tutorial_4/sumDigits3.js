let num = 3765238;
let sum = 0;
while(num>0){
    let lastDigit = num%10; 
    sum = sum + lastDigit;
    num = parseInt(num/10); 
}

console.log("Sum: "+sum);
