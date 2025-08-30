function getUser(userid) {
    // find user from database or file
    // once data is ready, call cb
    // may be this task is taking 1 sec
    return new Promise(function(resolve, reject){
        setTimeout(function () {
            let user = { uid: userid, uname: "ramesh", uage: 32 }
            resolve(user)
            // reject({"message": "not found"})
        }, 2000)
    });
}

function getPost(userid) {
    return new Promise(function(resolve, reject){
        setTimeout(function () {
            let post = { uid: userid, posts: ["Nature", "Tech"] }
            // resolve(post)
            // return post;
            reject({"message": "posts not found"})
        }, 1500)
    })
}

function getComment(postid) {
    return new Promise(function(resolve, reject){
        setTimeout(function () {
            let comment = { postid: postid, comments: ["Very good work", "I like your effort"] }
            resolve(comment)
            // reject({"message": "not found"})
        }, 1000)
    })
}


// usage - promise
getUser(23)
    .then(function(user){
        console.log(user)
        return getPost(user.uid);
    })
    .then(function(post){
        console.log(post)
        return getComment(post.posts[0]);
    })
    .then(function(comment){
        console.log(comment)
    })

    .catch(function(err){
        console.log(err)
    })

