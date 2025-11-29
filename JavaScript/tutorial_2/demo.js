// table display => 4

console.log("4 * 1 = 4");
console.log("4 * 2 = 8");
console.log("4 * 3 = 12");
console.log("4 * 4 = 16");
console.log("4 * 5 = 20");
console.log("4 * 6 = 24");
console.log("4 * 7 = 28");
console.log("4 * 8 = 32");
console.log("4 * 9 = 36");
console.log("4 * 10 = 40");

let tableNumber = 8;
let num = 1;
while (num < 11) {
    // console.log("Number is "+num);
    console.log(`${tableNumber} * ${num} = ${tableNumber * num}`);
    num = num + 1;
}


let countTables = 1;
while (countTables < 11) {
    let tableNumber = countTables;
    let num = 1;
    while (num < 11) {
        // console.log("Number is "+num);
        console.log(`${tableNumber} * ${num} = ${tableNumber * num}`);
        num = num + 1;
    }
    countTables = countTables + 1;
}