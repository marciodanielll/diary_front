import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HttpServiceUser } from '../services/http'
import { useDispatch } from 'react-redux'
import { setEmail, setToken, setName } from '../store/reducers/user-reducer'
import { toast } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [dataSignup, setDataSignup] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  })

  const handlerChange = (event) => {
    const { name, value } = event.target
    setDataSignup({ ...dataSignup, [name]: value })
  }

  const handleClick = async () => {
    try {
      const { name, email, password } = dataSignup
      const { data: { token } } = await HttpServiceUser().create({ name, email, password })

      dispatch(setName(name))
      dispatch(setEmail(email))
      dispatch(setToken(token))

      navigate('/diary')
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <div className="w-full max-w-md">
        <h1 className="text-4xl text-center text-white mb-8">Cadastro</h1>
        <form className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              placeholder="Seu nome"
              name='name'
              onChange={handlerChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              name='email'
              onChange={handlerChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="confirmar-email"
            >
              Confirmação do Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmar-email"
              type="email"
              placeholder="Confirme seu email"
              name='confirmEmail'
              onChange={handlerChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="senha"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              type="password"
              placeholder="******************"
              name='password'
              onChange={handlerChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="confirmar-senha"
              placeholder="******************"
            >
              Confirmação da Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmar-senha"
              type="password"
              name='confirmPassword'
              placeholder="Confirme sua senha"
              onChange={handlerChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClick}
            >
              Cadastrar
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-200 hover:text-blue-500"
              type="button"
              onClick={() => navigate('/')}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
