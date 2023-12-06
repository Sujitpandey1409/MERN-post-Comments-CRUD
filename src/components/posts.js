import './post.css'
import { useRef, useState } from 'react';
import axios from 'axios';

const Post = (props) => {
    const { inputType, setInputType } = useState('button')
    const [cmtBtnDisplay, setcmtBtnDisplay] = useState(false)
    const [cmtList, setcmtList] = useState(props.comment)
    const cmtInput = useRef()
    const cmtBtn = useRef()
    const loader1 = useRef()
    const loader2 = useRef()
    const BASE_URL = 'http://localhost:4000/'
    const handleInputClick = (e) => {
        e.preventDefault()
        setcmtBtnDisplay(true)
        console.log(cmtInput.current.id);
    }
    const handleInputBlur = () => {
        if (!cmtInput.current.value) {
            setcmtBtnDisplay(false)
        }
    }

    const handleCmtClick = async () => {
        const newVal = [...cmtList]
        newVal.unshift(cmtInput.current.value)
        // newVal.unshift(document.getElementById(props.id1).textContent)
        loader1.current.classList.add('loader')
        try {
            await axios.put(`${BASE_URL}api/data`, { id: props.id, comment: newVal })
        } catch (error) {
            console.error();
        }
        loader1.current.classList.remove('loader')
        // try {
        //     const data = await axios.get(`${BASE_URL}api/data`)
        //     console.log(data.data);
        // } catch (error) {
        //     console.error();
        // }
        console.log(props.posts);
        const reqData = props.posts.filter((el) => { return (el._id == props.id) })
        console.log(reqData, 'reqData')
        setcmtList(newVal)
        console.log(cmtList);
        setcmtBtnDisplay(false)
        cmtInput.current.value = ''
    }
    const handleDelete = async () => {
        loader2.current.classList.add('loader')
        try {
            await axios.delete(`${BASE_URL}api/data/${props.id}`)
            console.log('deleted successfully', props.id);
            console.log('current data:', props.posts);
        } catch (error) {
            console.error();
        }
        loader2.current.classList.remove('loader')
    }

    return (<div className={'postContainer'}>
        <div className={'post'}>
            <div className={'imageContainer'}>
                <img src={props.img} alt={'your image here'} />
            </div>
            <div className={'caption'}>
                <i>{props.caption}</i>
                <hr></hr>
                {(cmtList.length == 0) && <><i>Be the first one to comment here</i>😎</>}
                <ul>
                    <li ref={loader1}></li>
                    {cmtList.map((el, i) => { return (<li key={i}>{el}</li>) })}
                </ul>
                <textarea ref={cmtInput} id={props.id} onClick={handleInputClick} onBlur={handleInputBlur} type={'text'} className={'comment'} placeholder={'add a comment'} />
                {cmtBtnDisplay && <button onClick={handleCmtClick} ref={cmtBtn} className='commentButton'>Add</button>}
                <button ref={loader2} onClick={handleDelete} title='remove this post' className='delete'>❌</button>
            </div>
        </div>
    </div>)
}
export default Post;