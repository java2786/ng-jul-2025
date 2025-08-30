function greet(name, cb){
    console.log("Welcome "+name);
    cb(goodBye);
}

function goodBye(){
    console.log("Good Bye")
}

function eatLunch(cb){
    console.log("Eating lunch")
    cb()
}

greet("Ramesh", eatLunch)

