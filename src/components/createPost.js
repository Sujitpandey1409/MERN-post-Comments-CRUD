import { useRef, useState } from 'react'
import axios from 'axios'
import './createPost.css'
const PostCreationTemplate = (props) => {
    const [posts, setposts] = useState([])
    const url = useRef()
    const caption = useRef()
    const BASE_URL = 'http://localhost:4000/'
    const handleSubmit = async (e) => {
        e.preventDefault()
        let urlVal = url.current.value
        let captionVal = caption.current.value
        console.log(urlVal, captionVal)
        if (urlVal && captionVal) {
            // const newPost = [...props.posts]
            // // newPost.unshift({ url: urlVal, caption: captionVal })
            // newPost.push({ url: urlVal, caption: captionVal })
            // props.postVal(newPost)
            try {
                await axios.post(`${BASE_URL}api/data`,{ url: urlVal, caption: captionVal })
            } catch (error) {
                console.log(error);
            }
            urlVal = ''
            captionVal = ''
            url.current.value = ''
            caption.current.value = ''
        }
    }

    return (<div className={'template-container'}>
        <form onSubmit={handleSubmit} className={'template'}>
            <h1><i>Create Post</i></h1>
            <input ref={url} type='text' placeholder='post url' />
            <input ref={caption} type='text' placeholder='post description' />
            <button>Create Post</button>
        </form>
    </div>)

}
export default PostCreationTemplate 