// units = 250;
// bill = 0;

// if(units>200){
//     bill = bill + (units-200)*3.5;
//     units = 200;
// }
// if(units>100){
//     bill = bill + (units-100)*2.5;
//     units = 100;
// }
// bill = bill + units*1.5;

// console.log("Bill: "+bill);


units = 250;
bill = 0;

if(units>200){
    bill = (100 * 1.5) + (100*2.5) + (units-200)*3.5;
} else if(units>100){
    bill = (100 * 1.5) + ((units-100)*2.5);
} else {
    bill = (units * 1.5) 
}

console.log("Bill: "+bill)