import React, { PropTypes, Component } from 'react'



export default class Posts extends Component {
    render() {
        return (
            
            <ul className="">
                {this.props.posts.map((post, i) =>
                <div key={i}>
                <hr/>
                    <li  className="row">
                    
                    <img src={post.avatar_url} className="col-md-1" height="50px"></img>
                       
                    <div className="col-md-11">
                    <span className="login cursor_pointer"><a href={post.html_url} target="_blank">{post.login}</a></span>
                    <span className="name">{post.name}</span>

                    
                    <span className="bio row font-small">{post.bio}</span>
                   <div className="row">
                       <span className="loc-map"> 
                       <img src="https://imageog.flaticon.com/icons/png/512/67/67347.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF" className="loc-map" width="30" height="15"></img>
                       </span>
                   <span className="location  font-small">{post.location}</span>
                   </div>
                   </div>
                    </li>
                    </div>
                )}
            </ul>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};