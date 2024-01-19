import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'
const loginUrl = 'http://localhost:3003/api/login'

const signUp = (data) => {
  return axios.post(baseUrl,data);
}
const login = (data) => {
    return axios.post(loginUrl,data);
}
export default { signUp , login }