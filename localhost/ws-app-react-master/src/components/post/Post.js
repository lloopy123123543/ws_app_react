import './Post.css';
import React, { useState, useEffect } from 'react';

function Post(props) {
    const [post, setPost] = useState(props.post);

    useEffect(() => {
        setPost(props.post);
        
        return () => {
            setPost(null);
        }
    }, [props]);

    return(
        <React.Fragment>
                <div className='Post' onClick={props.isClick}>

                    <div>{post.post_title}</div>
                    <div>{post.post_info}</div>

                    

                    
                <div className='Img'>
                <div>{post.files && (
                        post.files.map((file, index) => (
                            <img key={'file_' + index} src={'http://localhost/ws-api-lumen-master/api/file/' + file.key} padding-left={30} height={190}/>
                        ))
                    )}</div>
                </div>
                </div>
        </React.Fragment>
    );
}

export default Post;