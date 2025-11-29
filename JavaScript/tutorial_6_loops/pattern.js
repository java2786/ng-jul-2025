/*

******
00000*
00000*
00000*
00000*
00000*


******
******
******
******
******
******
******

*/

let pattern = ``;
for(let i=1;i<=10;i++){
    let stars = "";
    for(let j=1;j<=5;j++){
        if(i==1 || j==5){
            stars = stars + " *";
        } else {
            stars = stars + "  ";
            // stars = `${stars}${j}`
        }
    }
    pattern = `${pattern}${stars}\n`
}
console.log(pattern)