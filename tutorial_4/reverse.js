// num -> reverse
// 245 -> 542

let num = 245;
let result = 0;

while(num>0){
    let lastDigit = num%10;     // 5
    num = parseInt(num/10);     // 24
    result = (result*10) + lastDigit; // 5
    // (5*10+4)*10+2 => 542
}

// lastDigit = num%10;         // 4
// num = parseInt(num/10);     // 2
// result = (result*10) + lastDigit; // 54

// lastDigit = num%10;         // 2
// num = parseInt(num/10);     // 0
// result = (result*10) + lastDigit; // 542

console.log(result);