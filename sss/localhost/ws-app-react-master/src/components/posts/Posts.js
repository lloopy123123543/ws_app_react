import './Posts.css';
import React, { useState, useEffect } from 'react';
import Post from '../post/Post';
import PostCreate from '../post-create/PostCreate';
import PostShow from '../post-show/PostShow';
// import PostDelete from '../post-delete/PostDelete';


function Posts() {
    const [posts, setPosts] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [routerComponent, setRouterComponent] = useState('posts');
    const [routerDelete, setRouterDelete] = useState('posts');
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        
        fetch("http://localhost/ws-api-lumen-master/api/posts")
        .then(res => res.json())
        .then(
          (result) => {
            setPosts(result);
          },
          (error) => {
            console.log(error);
          }
        );

        return () => {
            setPosts(null);
        }
    }, [isUpdate]);

    const postUpdate = () => {
        setIsUpdate(!isUpdate);
    }

    const openPost = (id) => {
        setRouterComponent('postShow');
        setPostId(id);
    }

    return(
        <React.Fragment>
            {routerComponent === 'posts' && (
                <React.Fragment>

                    <div className='Postik'>Сейчас мы наблюдаем все добавленные посты</div>
                    
                    <div className='Add'>
                        <a style={{color: 'white'}} onClick={() => setRouterComponent('postCreate')}> Добавить новый </a> 
                        

                    </div>
                    
                    {!!posts && (
                        posts.map((post, index) => (
                        <Post key={"post_" + index} post={post} isClick={() => openPost(post.id)} />
                    )))}
                    
                </React.Fragment>
            )}
            {routerComponent === 'postCreate' && (
                <React.Fragment>

                <div className='Addd'>
                    Сейчас мы на этапе создания поста! <a style={{color: 'white'}} onClick={() => setRouterComponent('posts')}>
                    Все посты</a></div>
                    <PostCreate isCreate={() => setRouterComponent('posts')}/>
                </React.Fragment>
            )}
            {routerComponent === 'postShow' && (
                <React.Fragment>
                <div className='Add'>
                    <a style={{color: 'white'}} onClick={() => setRouterComponent('posts')}>Вернуться назад</a></div>
                    <div className='blanck'>{postId && (<PostShow id={postId}/>)}</div>

                    
                    
                    
                </React.Fragment>
            )}
            {routerComponent === 'postDelete' &&(
                <React.Fragment>
                <div className='Delete'>
                    <a style={{color: 'white'}} onClick={() => setRouterDelete('posts')}>Check</a></div>



                </React.Fragment>


                
            )}
        </React.Fragment>
    );
}

export default Posts;