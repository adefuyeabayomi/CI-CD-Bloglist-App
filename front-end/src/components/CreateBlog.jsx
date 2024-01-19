import { useState } from 'react';
import styles from '../styles/mainStyles'

let formStyle = styles.formStyle;
let buttonStyle = styles.buttonStyle;


const CreateBlog = ({publishBlog}) => {

  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [url,setUrl] = useState('')

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value)
  }
  const handleAuthor = (e) => {
    e.preventDefault();
    setAuthor(e.target.value)
  }
  const handleUrl = (e) => {
    e.preventDefault();
    setUrl(e.target.value)
  }
  const add = () => {
    let blogData = {
        url , title , author , likes : 0
      }
    publishBlog(blogData).then(()=>{
        setTitle('');
        setAuthor('');
        setUrl('');
    })
  }

    return (
        <div>
            <h3>Create a new blog post</h3>
            <div>
            <form style={formStyle}>
                <p>Title : <input id='title' value={title} onChange={handleTitle}/> </p>
                <p>Author : <input id='author' value={author} onChange={handleAuthor}/> </p>
                <p>Url : <input id='url' value={url} onChange={handleUrl}/> </p>
            </form>
            <button style={buttonStyle} id='publishBlog' onClick={add}>Publish new blog post</button>
            </div>
        </div>
    )
}

export default CreateBlog