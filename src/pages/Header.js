import React, { useState } from 'react'
import { FaXmark, FaChevronDown } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setEmail, setName, setToken } from '../store/reducers/user-reducer'

const Header = () => {
  const Links = [
    { name: 'Início', link: '/' },
    { name: 'Configurações', link: '/' }
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    try {
      dispatch(setName(''))
      dispatch(setToken(''))
      dispatch(setEmail(''))
      toast.success('Logout feito com sucesso', {
        position: 'top-center'
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='shadow-md w-screen fixed top-0 left-0'>
      <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg-white'>
        {/* {logo here} */}
        <div className='flex text-2xl cursor-pointer items-center gap-1'>
          <span className='font-bold'>Diary</span>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 md:hidden cursor-pointer'>
          {
            isOpen ? <FaXmark /> : <FaChevronDown />
          }

        </div>
        <ul className={`md:flex pl-9 md:pl-0 md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto transitions-all bg-white duration-500 ease-in' ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
          {
            Links.map((link, index) => (
              <li className=' font-semibold my-7 md:my-0 md:ml-8' key={ index }>
                <a href='/'
                  className='text-gray-800 hover:text-blue-400 duration-500'
                  >
                    {link.name}
                </a>
              </li>
            ))
          }
          <button
            className='btn bg-violet-600 text-white py-1 px-3
            md:ml-8 rounded md:static duration-500 font-semibold'
            onClick={ () => { handleLogout() } }
            >Logout</button>
        </ul>
      </div>
    </div>
  )
}

export default Header
