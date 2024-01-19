import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from "./components/Notification"
import styles from './styles/mainStyles'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/toggle'

let formStyle = styles.formStyle;
let buttonStyle = styles.buttonStyle;
let bodyStyle= styles.bodyStyle;


  const App = () => {
  const [blogs, setBlogs] = useState([])

  const [showNotification,setShowNotification] = useState(false)
  const [notificationText,setNotificationText] = useState('')
  const [notifType,setNotifType] = useState('')

  const [userToken,setUserToken] = useState(window.localStorage.getItem("userToken"))


  useEffect(() => {
    blogService.getAll().then(blogs =>{
      function compare (a,b) { return a.likes > b.likes ? -1 : 1 } 
      blogs = blogs.sort(compare)
      console.log("blogs sorted", blogs)
      setBlogs( blogs )
    }
    )  
  }, [userToken])

  const removePost = (id) => {
    let newBlogsArray = [];
    blogs.forEach( x => {
      x.id !== id ? newBlogsArray.push(x) : ""
    })
    setBlogs(newBlogsArray)
  }

  const publishBlog = async (blogData) => {
   let {title,author} = blogData;
    try {
      let published = await blogService.publish(blogData,userToken);
      console.log("published",published)
      if(published.status === 201){
        blogData.id = published.data.id
        blogData.user={
          id : window.localStorage.getItem("userID")
        } 
        console.log("blogdata",blogData)
        setNotificationText('A new blog! ' + title + " posted by " + author );
        setNotifType("success");
        setShowNotification(true);
        setTimeout(()=>{
          setShowNotification(false);
        }, 5000)
        setBlogs(blogs.concat(blogData))
      }
    }
    catch (err) {
      console.error("error in publish blog",err)
      setNotificationText("session time out. login again to publish post" );
      setNotifType("error");
      setShowNotification(true);
      setTimeout(()=>{
        setShowNotification(false);
      }, 5000)
      alert("an error occured, possibly a session time out. try to login again  to see if that fixes the issue. if not, contact our customer care on LOL")
      setUserToken(null)
    }
  }

  const logOut = () => {
    window.localStorage.clear();
    setUserToken(null)
  }

  if(userToken !== null){

    return (
      <div style={bodyStyle}>
        <Notification type={notifType} text={notificationText} showNotification={showNotification} />
        <Togglable>
          <CreateBlog publishBlog={publishBlog} />
        </Togglable>
        <h2>blogs</h2>
        <p>{window.localStorage.getItem("username")} is logged in <button onClick={logOut} >Logout</button></p>
        {blogs.map((blog,i) =>
          <Blog removePost={removePost} key={blog.id} blog={blog} />
        )}
      </div>
    )

  }


  else return (

    <div>
      <LoginForm setUserToken={setUserToken}/>
    </div>

  )

}

export default App