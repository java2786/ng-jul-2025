async function myfunc(){
    try{
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    let json = await response.json()
    
    console.log("3")
    console.log("4")
    console.log("5")
    console.log("6")
    console.log("7")
    console.log("8")
    } catch(err){
        console.log("some error")
    }
}

console.log("before fetch ")

myfunc()

console.log("after fetch")


