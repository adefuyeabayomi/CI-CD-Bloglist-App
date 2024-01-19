import { useState } from 'react'
import styles from '../styles/mainStyles'

let buttonStyle = styles.buttonStyle;


const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button style={buttonStyle} id='newBlogButton' onClick={toggleVisibility}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button style={buttonStyle} id='cancelNewBlog' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable