import axios from 'axios'

export const HttpServiceUser = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  })

  const create = (user) => {
    return api.post('/user', user)
  }

  const login = (login) => {
    return api.post('/user/login', login)
  }

  return {
    create,
    login
  }
}
