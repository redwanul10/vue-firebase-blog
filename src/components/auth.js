
import {Firebase,emailProvider} from '../FirebaseConfig'
//import firebase from 'firebase/auth'

// ==========================================
// User Registration Function
// ==========================================

export const registerUser = (name,email,password)=>{
    
    return new Promise((resolve,reject)=>{

        Firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res=>{
            console.log(res)
            var user = Firebase.auth().currentUser;
            return user.updateProfile({
                displayName: name,
                photoURL: ""
            })
        })
        .then(res=>{
            console.log(res)
            Firebase.database().ref('users').push({
                email,
                name,
                photoURL: ""
            },(err)=>{
                if(err) return reject(err)
                resolve('user created')
            })
        })
        .catch(err=>reject(err))
    })
    
}

// ==========================================
// User Login Function
// ==========================================

export const loginUser = (email,password)=>{
    return Firebase.auth().signInWithEmailAndPassword(email,password)
}



// ==========================================
// User Logout Function
// ==========================================

export const logOutUser = ()=>{
    return Firebase.auth().signOut()
}




// ==========================================
// User Login Function
// ==========================================

export const isAuthenticateUser = ()=>{
    return new Promise((resolve,reject)=>{
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                return resolve(user)
            } else {
                return reject('unAuthenticated user')
            }
        });
    })
}


// ==========================================
// Save User Localstorage Function
// ==========================================


export const saveToLocalStorage = (loggedUser)=>{
    const user = {
        name : loggedUser.displayName,
        email: loggedUser.email,
        uid  : loggedUser.uid
    }
    console.log("saving user to local storage")
    let loggedUsers = localStorage.getItem('users')

    if(!loggedUsers){
        localStorage.setItem('users',JSON.stringify([user]))
    }else{
        loggedUsers = JSON.parse(loggedUsers)
        const index = loggedUsers.findIndex(loggedUser=> loggedUser.uid === user.uid)
        console.log(index)
        if(index === -1){
            loggedUsers.push(user)
            localStorage.setItem('users',JSON.stringify(loggedUsers))
        }
    }
}


// ==========================================
// Update User Localstorage Function
// ==========================================


export const updateLocalStorage = (name,email,uid)=>{
    
    console.log("updating user to local storage")
    let loggedUsers = localStorage.getItem('users')

    if(loggedUsers){
        
        loggedUsers = JSON.parse(loggedUsers)
        const index = loggedUsers.findIndex(loggedUser=> loggedUser.uid === uid)
        
        console.log(index)
        if(index !== -1){
            loggedUsers[index].name  = name
            loggedUsers[index].email = email
            loggedUsers[index].uid   = uid

            localStorage.setItem('users',JSON.stringify(loggedUsers))
        }
    }
}




// ==========================================
// Reset Password Function
// ==========================================

export const resetPassword = (emailAddress)=>{
    return Firebase.auth().sendPasswordResetEmail(emailAddress)
}


// ==========================================
// ,Re-Authenticate User Function
// ==========================================


export const reAuthenticateUser = (user,email,password)=>{
    var cred = emailProvider.credential(email,password);
    return user.reauthenticateWithCredential(cred)
}


// ==========================================
// Update Password Function
// ==========================================

export const updatePassword = (currentUser,newPassword)=>{
    return currentUser.updatePassword(newPassword)
}


// ==========================================
// Update Profile Function
// ==========================================

export const updateProfile = (user,email,name)=>{
    user.updateEmail(email)
    .then(()=>{
        return user.updateProfile({
            displayName: name,
        })
    })
}




// ==========================================
// Create Post Function
// ==========================================

export const createPost = (title,content,image,userId,excerpt) =>{
    return new Promise((resolve,reject)=>{
        //const userId = Firebase.auth().currentUser.uid
        Firebase.database().ref('posts').push({
            title,
            content,
            author : userId,
            featuredImage:image,
            excerpt,
            createdAt: Date.now()
        },(err)=>{
            if(err) return reject(err)
            console.log('post created')
            return resolve('post created')
        })
    })
}


// ==========================================
// Update Post Function
// ==========================================

export const updatePost = (postId,title,content,image,excerpt) =>{
    return new Promise((resolve,reject)=>{
        Firebase.database()
        .ref('posts/'+postId)
        .update(
        {   title,
            content,
            featuredImage:image,
            excerpt
        }
        ,(err)=>{
            if(err) return reject(err)
            return resolve('post updated')
        }
        )
    })
}

// ==========================================
// Delete Post Function
// ==========================================

export const deletePost = (postId) =>{
    return Firebase.database()
    .ref('posts/'+postId)
    .remove()
}



// ==========================================
// Photo Upload Function
// ==========================================

export const uploadPhoto = (file) =>{
    return new Promise((resolve,reject)=>{
        const ref = Firebase.storage().ref().child('posts/'+file.name)
        ref.put(file)
        .then(()=>ref.getDownloadURL())
        .then(url=>resolve(url))
        .catch(err=>reject(err))
    })
}


// ==========================================
// Get All / Single Post Function
// ==========================================

export const getPost = (id,via)=> {
    return new Promise((resolve)=>{
        const data  = []
        
        // Retrive Specific Author Posts 
        if(via === 'byAuthor'){
            return Firebase.database()
            .ref('posts')
            .orderByChild('author')
            .equalTo(id)
            .once('value',(snapshot)=>{
                snapshot.forEach(child=>{
                    const singlePost = child.val()
                    singlePost['postId'] = child.key
                    data.unshift(singlePost)
                })
                resolve(data)
            })
        }

        const path  = id ? 'posts/'+id :'posts'

        // Retrive Single/All Post Based on Condition
        Firebase.database().ref(path)
        .once('value',(snapshot)=>{
            // return single post
            if(id)return resolve(snapshot.val())
            // return all posts
            snapshot.forEach(child=>{
                const singlePost = child.val()
                singlePost['postId'] = child.key
                data.unshift(singlePost)
            })
            return resolve(data)
        })
    })
}