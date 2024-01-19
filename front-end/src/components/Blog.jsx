import { useState } from "react"
import styles from "../styles/mainStyles"
import services from "../services/blogs"

const Blog = ({ blog, removePost }) => {  
  let [showDetails,setShowDetails] = useState(false)
  let [likes, setLikes] = useState(blog.likes)

  let userID = window.localStorage.getItem("userID");

  const updateDetailsVisibility = () => {
    setShowDetails(!showDetails);
  }

  const like = async () => {
    let liked = await services.like(blog.id,{likes : blog.likes + 1,type : "like"},window.localStorage.getItem("userToken"));
    console.log("liked",liked);
    setLikes(likes + 1)
  }
  const deleteBlog = () => {
    services.deleteBlog(blog.id,window.localStorage.getItem("userToken")).then(deleted => {
      alert("deleted post successfully")
      removePost(blog.id)
      console.log("deleted", deleted);
    }).catch(err=> {
      alert(err.response)
      console.error("unable to delete",err)
    })
  }

  let deleteButton = userID === blog.user.id ? <button style={styles.deleteStyle} onClick={deleteBlog} >Remove</button> : ""

  let currentButton = <button></button>
  currentButton = showDetails? <button onClick={updateDetailsVisibility}>Hide</button> : <button className="showButton" onClick={updateDetailsVisibility}>Show</button>
  let details = <p></p>;
  details = showDetails ? (<div>
    <p className="url">Link : <a href={ blog.url }> {blog.url} </a></p>
    <p className="likes">Likes : {likes} <button onClick={like} >Like</button></p>
    {deleteButton}
  </div>) : <div></div>

  return (
    <div style={styles.blogStyle}>
      <h3 className="title">Title : {blog.title} {currentButton} </h3>
      <p className="author">Author {blog.author} </p>
      {details}
    </div>  
  )
}

export default Blog