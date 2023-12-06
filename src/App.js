import PostCreationTemplate from './components/createPost'
import Post from './components/posts'
import './App.css';
import { useState } from 'react'
import axios from 'axios';
const BASE_URL = 'http://localhost:4000/'

function App() {
  const [posts, setposts] = useState([])
  // const postVal = (valFromcreatePost) => {
  //   setposts(valFromcreatePost)
  //   console.log(posts, 'from app.js');
  // }
  const fetchData = async()=>{
    try {
      const data = await axios.get(`${BASE_URL}api/data`)
      setposts(data.data)
    } catch (error) {
      console.error(error)
    }
  }
  fetchData()
  return (
    <div className="App">
      <PostCreationTemplate  posts={posts} />
      <div className='posts'>
        {posts.map((el, i) => {
          return (
            <Post img={el.url} caption={el.caption} key={el._id} id={el._id} posts={posts} comment={el.comment}/>
          )
        })}
      </div>
    </div>

  );
}

export default App;
