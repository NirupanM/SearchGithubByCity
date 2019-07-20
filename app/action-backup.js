import fetch from 'isomorphic-fetch'
import axios from 'axios'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const REQUEST_DETAIL_USER = 'REQUEST_DETAIL_USER' 

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function requestDetailUser(user_id){
    return {
        type: REQUEST_DETAIL_USER,
        user_id
    }
}


function receivePosts(subreddit, json) {
    console.log(json);
    var t = this;
    let users = json.items;
    let usersArr = [];
    let single_user;
    
    var promises =  json.items.map((
        item => {
           return axios.get(`https://api.github.com/user/${item.id}`)
           // .then(response => response.json())
            .then(res =>{ res; console.log(res); return res.data;}) //usersArr.push(res); localStorage.setItem('usersArr',usersArr); })
            //user.then(r=> {console.log(r);return r})
        }
    ))

    console.log(json);

    Promise.all(promises).then(function(results) {
        console.log(results)
        //console.log(usersArr);

        json.items = results
        
        return {
            type: RECEIVE_POSTS,
                    subreddit,
            //        posts: json.data.children.map(child => child.data),
                    posts: json.items,
                    receivedAt: Date.now()
       }     

      
        
    }) 


    //  json.items.map((
    //      item =>{  //console.log(item);
    //    let dt=fetch(`https://api.github.com/user/${item.id}`)
    //     .then(response => response.json())
    //     .then(res => { res //usersArr.push(res);//console.log(usersArr)

    //     }); 

            
      
    //     console.log(dt);
    //     })

    //  )

    // console.log(usersArr);

    return {
        type: RECEIVE_POSTS,
        subreddit,
//        posts: json.data.children.map(child => child.data),
        posts: json.items,
        receivedAt: Date.now()
    }


}

function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        //return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        return fetch('https://api.github.com/search/users?q=location%3Abangalore+followers:>500')
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
            
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}