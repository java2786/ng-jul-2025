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




async function pdemo () {
    try{
        let user = await getUser(23);
        console.log("after get user");
        console.log(user)
        let post = await getPost(user.uid);
        console.log("after post getting")
        console.log(post);
        let comments = await getComment(post.posts[0]);
        console.log("after getting comments")
        console.log(comments)
    } catch(err){
        console.log("Some error occurred")
        console.log(err)
    }
}
pdemo();

