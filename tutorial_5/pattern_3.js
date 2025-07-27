/*
    0 0 0 0 * 4-0,1-*
    0 0 0 * * 3-0,2-*
    0 0 * * * 2-0,3-*
    0 * * * * 1-0,4-*
    * * * * * 0-0,5-*
*/

let rows = 5

for(let i=1;i<=rows;i++){

    let output = "";
    for(let m=1;m<=rows-i;m++){
        output = output + "0 "
    }


    for(let j=1;j<=i;j++){
        output = output + "* ";
    }
    console.log(output);
}
