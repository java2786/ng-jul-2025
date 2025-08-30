function getUser(userid, cb) {
    // find user from database or file
    // once data is ready, call cb
    // may be this task is taking 1 sec
    setTimeout(function () {
        let user = { uid: userid, uname: "ramesh", uage: 32 }
        cb(null, user)
        // cb({"message": "not found"}, null)
    }, 4000)
}

function getPost(userid, cb) {
    setTimeout(function () {
        let post = { uid: userid, posts: ["Nature", "Tech"] }
        cb(null, post)
        // return post;
        // cb({"message": "not found"}, null)
    }, 5500)
}

function getComment(postid, cb) {
    setTimeout(function () {
        let comment = { postid: postid, comments: ["Very good work", "I like your effort"] }
        // cb(null, comment)
        cb({"message": "comments not found"}, null)
    }, 8000)
}


// usage - nested functions - callback hell

getUser(53, function (err, user) {
    if (err !== null) {
        console.log("Error occurred while finding user: " + err.message)
    } else {
        console.log("User found");
        console.log(user);

        // get post after finding user
        getPost(user.uid, function (err, post) {
            if (err !== null) {
                console.log("Error occurred while finding post: " + err.message)
            } else {
                console.log("Post found");
                console.log(post);

                getComment(post.posts[1], function (err, comment) {
                    if (err !== null) {
                        console.log("Error occurred while finding comments: " + err.message)
                    } else {
                        console.log("Comments found")
                        console.log(comment)
                    }
                })
            }
        })
    }
})