import { USER_POST_STATE_CHANGE, USER_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POST_STATE_CHANGE } from '../constants/index'
import firebase from 'firebase'
require('firebase/firestore')

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    // console.log(snapshot.data())
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else {
                    console.log('snapshot does not exist')
                }
        })
    })
}

export function fetchUserPosts(){
    return((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    // map iterates through all docs inside snapshot, puts it inside array called posts
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data}
                })
                // console.log(posts)
                dispatch({type: USER_POST_STATE_CHANGE, posts })
        })
    })
}

export function fetchUserFollowing(){
    return ((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return id
                })
                dispatch({type: USER_FOLLOWING_STATE_CHANGE, following})

        })
    })
}

export function fetchUsersData(uid) {
    return((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        // if user does not exist in array users
        if (!found) {
            return((dispatch) => {
                firebase.firestore()
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then((snapshot) => {
                        if(snapshot.exists){
                            // get user first (+ full object)
                            let user = snapshot.data();
                            user.uid = snapshot.id;
                            dispatch({type: USERS_DATA_STATE_CHANGE, user})
                            dispatch(fetchUsersFollowingPosts(user.id));
                        }
                        else {
                            console.log('snapshot does not exist')
                        }
                })
            })
        }
    })
}

export function fetchUsersFollowingPosts(uid){
    return((dispatch, getState) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                
                const uid = snapshot.query.EP.dispatch.segments[1];
                console.log({snapshot, uid});
                const found = getState().usersState.users.find(el => el.uid === uid);   // find: will give the user objects within the obj array

                let posts = snapshot.docs.map(doc => {
                    // map iterates through all docs inside snapshot, puts it inside array called posts
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data, user }
                })
                // console.log(posts)
                dispatch({type: USERS_POST_STATE_CHANGE, posts, uid })
        })
    })
}