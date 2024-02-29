import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HttpServiceUser } from '../services/http'
import emailValidator from '../utils/emailValidator'
import passwordValidator from '../utils/passwordValidator'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setToken, setName } from '../store/reducers/user-reducer'

const ONE_SECOND = 1000
const TWO_SECONDS = 2000

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user.token) {
      navigate('/diary')
    }
  })

  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: ''
  })

  const handleChange = (data) => {
    setDataLogin({
      ...dataLogin,
      [data.name]: data.value
    })
  }
  const { email, password } = dataLogin

  const handleLogin = async () => {
    const emailIsValid = emailValidator(email)
    const passwordIsValid = passwordValidator(password)

    switch (true) {
      case !emailIsValid && !passwordIsValid:
        toast.error('E-mail com formato inválido', {
          position: 'top-center'
        })
        toast.error('A senha deve conter no mínimo 8 caracteres', {
          position: 'top-center'
        })
        break
      case !emailIsValid:
        toast.error('E-mail com formato inválido', {
          position: 'top-center'
        })
        break
      case !passwordIsValid:
        toast.error('A senha deve conter no mínimo 8 caracteres', {
          position: 'top-center'
        })
        break
      default:
        try {
          const response = await HttpServiceUser().login(dataLogin)
          const {
            data: { token, name }
          } = response

          dispatch(setName(name))
          dispatch(setEmail(email))
          dispatch(setToken(token))

          toast.success('Login com Sucesso!', {
            autoClose: ONE_SECOND,
            position: 'top-center'
          })

          setTimeout(() => {
            navigate('/diary')
          }, TWO_SECONDS)
        } catch (error) {
          const {
            response: {
              data: { statusCode, message }
            }
          } = error

          console.log({
            statusCode,
            message
          })

          if (statusCode === 400) {
            toast.error(message,
              {
                position: 'top-center'
              })
          } else {
            toast.error('Desculpe tente mais tarde',
              {
                position: 'top-center'
              })
          }
        }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-md w-full space-y-8 bg-gray-700 p-6 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            LOGIN
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
                onChange={(e) => handleChange(e.target)}
                value={email}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                onChange={(e) => handleChange(e.target)}
                value={password}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-white hover:text-blue-500"
              >
                Esqueci minha senha
              </a>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-white hover:text-blue-500"
                onClick={() => navigate('/signup')}
              >
                Cadastrar
              </a>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleLogin()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
