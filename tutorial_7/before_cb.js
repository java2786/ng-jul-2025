// callback is function passed as an argument

function add(){} // legacy way

let sum = function(){} // function without name

var mul = function(){}

var div = ()=>{} // arrow function

sum()
mul()

let num = 32
let copy = num

let calc = function(){console.log("in calc")} 
let f = calc;

f()


// =============
let stf = function(){console.log("in set time out")}

setTimeout(function(){console.log("in set time out")}, 0)
setTimeout(stf, 5000)

// =========


let obj = {age: 43, address: "abc"}
for(key in obj){
    console.log(key + " : "+obj[key])
}