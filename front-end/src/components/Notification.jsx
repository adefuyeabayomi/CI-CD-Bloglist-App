import styles from "../styles/mainStyles"

const Notification = ({type,text,showNotification}) => {
    let notificationStyle;
    if(type === 'success'){
        notificationStyle = styles.notificationStyleSuccess;
    }
    else{
        notificationStyle = styles.notificationStyleError;
    }
    if(!showNotification){
      return (
        <p></p>
      )
    }
    return (
      <div style={notificationStyle}>
        <p>{text}</p>
      </div>
    )
  }

  export default Notification