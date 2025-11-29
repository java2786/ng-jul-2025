function greet(name, cb) {
    console.log("Welcome " + name);  // 1
    cb(function () {
        console.log("Good Bye") // 3
    });
}


greet("Ramesh", function (cb) {
    console.log("Eating lunch");  // 2
    cb() 
})

