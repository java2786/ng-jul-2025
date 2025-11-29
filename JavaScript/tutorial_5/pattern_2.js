/*
    1
    2 2
    3 3 3
    4 4 4 4
    5 5 5 5 5

    */

let rows = 5

for(let i=1;i<=rows;i++){
    let output = "";
    for(let j=1;j<=i;j++){
        output = output + "* ";
    }
    console.log(output);
}

// let output = "";
// for(let j=1;j<=5;j++){
//     output = output + "* ";
// }
// console.log(output);