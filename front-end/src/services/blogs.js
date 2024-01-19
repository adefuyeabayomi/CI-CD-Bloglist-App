import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const publish = (data,token) => {
  return axios.post(baseUrl,data,{
    headers : {
      Authorization : token
    }
  })
}
const like = (id,data,token) => {
  return axios.put(baseUrl+'/'+id, data, {
    headers : {
      Authorization : token
    }
  })
}

const deleteBlog = (id,token) => {
  return axios.delete(baseUrl+'/'+id,{
    headers : {
      Authorization : token
    }
  })
}

export default { getAll, publish, like, deleteBlog}