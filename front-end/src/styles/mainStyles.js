let notificationStyleSuccess = {
    margin : 15,
    borderWeight : 2,
    borderStyle : 'solid',
    borderRadius : 8,
    borderColor : 'green',
    backgroundColor: '#85FF8D',
    color : 'green',
    padding: '10px 15px'
}

let notificationStyleError = {
    margin : 15,
    borderWeight : 2,
    borderStyle : 'solid',
    borderRadius : 8,
    backgroundColor: '#FF85B2',
    color : '#FC4850',
    padding: '10px 15px'
}

const blogStyle = {
    margin : 10,
    border : "2px solid",
    borderRadius : 8,
    color : "gray",
    padding : 8
}
  
let formStyle = {
    padding : 10,
    borderRadius : 8,
    border : "1px solid",
    margin : 10
}
  
let buttonStyle = {
    marginLeft : 10,
    width : "20%",
    minWidth : 100
}

let bodyStyle = {
    fontFamily : "segoe ui,open sans,arial,sans-serif"
}

let deleteStyle = {
    backgroundColor : 'pink',
    borderRadius : 5,
    padding : "4px 25px"
}

let styles = {notificationStyleError,notificationStyleSuccess,blogStyle,formStyle,buttonStyle,bodyStyle, deleteStyle}

export default styles