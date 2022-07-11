// data start
let users = [
    {
        name: 'User 1',
        password: 'pass123',
        age: 30,
        isLogin: false
    },
    {
        name: 'User 2',
        password: 'pass124',
        age: 33,
        isLogin: false
    },
    {
        name: 'User 3',
        password: 'pass125',
        age: 21,
        isLogin: false
    },
    {
        name: 'User 4',
        password: 'pass126',
        age: 56,
        isLogin: false
    },
    {
        name: 'User 5',
        password: 'pass127',
        age: 42,
        isLogin: false
    },
    {
        name: 'User 6',
        password: 'pass128',
        age: 13,
        isLogin: false
    },
    {
        name: 'User 7',
        password: 'pass129',
        age: 29,
        isLogin: false
    },
    {
        name: 'User 8',
        password: 'pass130',
        age: 53,
        isLogin: false
    },
    {
        name: 'User 9',
        password: 'pass131',
        age: 18,
        isLogin: false
    },
    {
        name: 'User 10',
        password: 'pass132',
        age: 48,
        isLogin: false
    }
];

let posts = [
    {
        id: 1,
        title: 'Post 1',
        user: 'User 3',
        likes: 34
    },
    {
        id: 2,
        title: 'Post 2',
        user: 'User 4',
        likes: 58
    },
    {
        id: 3,
        title: 'Post 3',
        user: 'User 6',
        likes: 90
    },
    {
        id: 4,
        title: 'Post 4',
        user: 'User 2',
        likes: 2
    },
    {
        id: 5,
        title: 'Post 5',
        user: 'User 3',
        likes: 128
    },
    {
        id: 6,
        title: 'Post 6',
        user: 'User 1',
        likes: 743
    },
    {
        id: 7,
        title: 'Post 7',
        user: 'User 8',
        likes: 9
    },
    {
        id: 8,
        title: 'Post 8',
        user: 'User 10',
        likes: 90
    },
    {
        id: 9,
        title: 'Post 9',
        user: 'User 4',
        likes: 73
    },
    {
        id: 10,
        title: 'Post 10',
        user: 'User 2',
        likes: 581
    },
];
// data end

// users scripts start
// create logic
let inSystem = '';
function changeInSystemUser(userName=''){
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system` : h3.innerText = 'No users in sytem'
};
function checkPassword(pass, passConfirm){
    return pass === passConfirm;
};
function checkUniqueUserName(userName){
    return users.some(item => item.name === userName);
};
function createUser(){
    let userName = prompt('Enter username');
    if(checkUniqueUserName(userName)) {
        alert('User already exists'); 
        return;
    };
    let pass = prompt('Enter password');
    let passConfirm = prompt('Enter pass confirmation');
    if(!checkPassword(pass, passConfirm)) {
        alert('Passwords don\'t match'); 
        return;
    };
    let age = +prompt('Enter age');
    let userObj = {
        name: userName,
        password: pass,
        age: age,
        isLogin: false
    };
    users.push(userObj);
    alert('Created successfully');
    console.log(users);
};
// login logic
function getUserObj(userName){
    return users.find(item => item.name === userName);
};
function checkUserPassword(userName, pass){
    let user = getUserObj(userName);
    return user.password === pass;
};
function loginUser(){
    let userName = prompt('Enter username');
    if(!checkUniqueUserName(userName)){
        alert('User not found');
        return;
    };
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName, pass)){
        alert('Password doesn\'t match this account');
        return;
    }
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
};
// logout logic
function logoutUser(){
    changeInSystemUser('');
};
// users scripts end

// posts scripts start
// create post logic
function createPost(){
    if(!inSystem){
        alert('Only authorized users can create post');
        return;
    };
    let postTitle = prompt('Enter post title');
    let postObj = {
        id: posts.length + 1,
        title: postTitle,
        user: inSystem,
        likes: 0
    };
    posts.push(postObj);
    alert('Post successfully created');
    console.log(posts);
};
// update post logic
function getPostObj(id){
    return posts.find(item => item.id === id);
};
function checkOwnerPost(id){
    let postObj = getPostObj(id);
    return postObj && postObj.user === inSystem;
};
function updatePost(){
    if(!inSystem){
        alert('Only authorized users can create post');
        return;
    };
    let postId = +prompt('Enter post id');
    if(!checkOwnerPost(postId)){
        alert('There is no post with this id, or you are not the author of such a post');
        return
    };
    let postObj = getPostObj(postId);
    let newPostData = prompt('Enter new post data');
    postObj.title = newPostData;
    alert('Post successfully updated');
    console.log(posts);
};
// delete post logic
function deletePost(){
    if(!inSystem){
        alert('Only authorized users can create post');
        return;
    };
    let postId = +prompt('Enter post id');
    if(!checkOwnerPost(postId)){
        alert('There is no post with this id, or you are not the author of such a post');
        return
    };
    posts = posts.filter(item => item.id !== postId);
    alert('Successfully deleted');
    console.log(posts);
};
// posts scripts end

// comments scripts start
// create comments
function checkCommentKey(obj){
    return Object.keys(obj).some(item => item === 'comments');
};
function createComments(){
    if(!inSystem){
        alert('Only authorized users can create comment');
        return;
    };
    let postId = +prompt('Enter post id');
    let postObj = getPostObj(postId);
    console.log(postObj);
    if(!postObj){
        alert('Post not found');
        return;
    };
    let commentContent = prompt('Enter comment content');
    let commentObj = {
        id: null,
        content: commentContent,
        user: inSystem
    };
    if(checkCommentKey(postObj)){
        commentObj.id = 'comm-' + (postObj.comments.length + 1);
        postObj.comments.push(commentObj);
    }else{
        commentObj.id = 'comm-' + 1;
        postObj.comments = [commentObj, ];
    };
    alert('Comment created successfully');
    console.log(posts);
};
// delete comment
function getCommObj(id){
    let comments = [];
    let getComments = posts.forEach(item => {
        if(item.comments){
            for(i of item.comments){
                comments.push(i);
            };
        };
    });
    return comments.find(item => item.id === id);
};
function checkOwnerComment(id){
    let commObj = getCommObj(id);
    return commObj && commObj.user === inSystem;
};
function deleteComments(){
    if(!inSystem){
        alert('Only authorized users can create comment');
        return;
    };
    let commentId = prompt('Enter comment id');
    if(!checkOwnerComment(commentId)){
        alert('There is no post with this id, or you are not the author of such a post');
        return;
    };
    posts = posts.map(item => {
        if(item.comments){
            item.comments = item.comments.filter(comm => comm.id !== commentId)
        };
        return item
    });
    alert('Comment successfully deleted');
    console.log(posts);
};
// comments scripts end