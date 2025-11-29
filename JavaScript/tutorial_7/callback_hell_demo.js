function readFile(path, cb){
    setTimeout(function(){
        console.log("reading file "+path)
        cb({name: "Ramesh", pwd: "ram@123"}, updatePwd)
    }, 0);
}

function updatePwd(user, newPwd){
    setTimeout(function(){
        console.log("Updating pwd");
        
        return {...user, pwd: newPwd};
    }, 0);
}

function printDetails(user, cb){
    setTimeout(function(){
        console.log("Print details")
        
        for(key in user){
            console.log(key + " : "+user[key])
        }
        cb()
    }, 0);
}


let path = "filepath"
// u = readFile(path)
// printDetails(u)
// u2 = updatePwd(u, "abc")
// printDetails(u2)


readFile(path, printDetails)