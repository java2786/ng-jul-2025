/*
Array -> arrange data in sequence

*/

// Declare
let myArray = [43, "five", true, function(){}, [], {}, NaN]
let scores = [35, 56, 67, 28, 91];

let names = []

// 1. to add name (Ramesh) in the array
names[0] = "Ramesh"
names[1] = "Mahesh"
names[5] = "Suresh"

// 2. add name (Ramesh) in the array in better way
let names = []
// names[names.length] = "Ramesh"
// names[names.length] = "Mukesh"
// names[names.length] = "Dinesh"

names.push("Ramesh")
names.push("Mahesh")
names.push("Rajesh")
names.push("Ritesh")

console.log(names)

// ['Dinesh', 'Mahesh', 'Rajesh']
names[1] = "Hitesh"


// index - computer counting
// position - human counting
index = 1
position = 4
count = 2
names.slice(index, position)
names.splice(index, count) // delete


// insert element at a given index
let names = []
names.push("Ramesh")
names.push("Mahesh")
// 2 -> Jitesh
names.push("Rajesh")
names.push("Ritesh")
names.push("Gukesh")
names.push("Kamlesh")
names.push("Dinesh")

let name = "Jitesh"
let i = 2;

let temp = names.splice(i)

let newArr = [...names, name, ...temp]


// names.splice(index, 0, newElement)