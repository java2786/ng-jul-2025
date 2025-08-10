console.log("before fetch ")

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(function(response){return response.json()})
    .then(json => console.log(json))
    .then(function(){console.log("3")})
    .then(function(){console.log("4")})
    .then(function(){console.log("5")})
    .then(function(){console.log("6")})
    .then(function(){console.log("7")})
    .then(function(){console.log("8")})
    .catch(function(err){console.log("Some error");console.log(err)})


console.log("after fetch")