import React, { useState } from 'react'
import Menu from '../Menu'
import { MdCategory } from 'react-icons/md'
import { AiOutlineMenu, AiOutlineClose, AiFillGolden, AiFillPieChart } from 'react-icons/ai'
import {BsFillGridFill} from 'react-icons/bs'
import { FaUserAlt} from 'react-icons/fa'
import {ImUser} from 'react-icons/im'
import { useQuery } from '../../lib/graphql'
import { useRouter } from 'next/router'
const GET_ME = `
  query{
  panelGetMe{
    id
    name
    email
    role
  }
}`
const Layout = ({ children }) => {
  const { data, error, mutate } = useQuery(GET_ME)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const openDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const logout = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    localStorage.clear()
    router.push('/')
  }
  console.log(data?.panelGetMe)
  const currentPage = router.pathname.split('/')[1]
  return (
    <div>
      <div className={`flex h-screen bg-gray-900`}>
        <div
          className={`
            fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-slate-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0'
            ${
              sidebarOpen
                ? 'translate-x-0 ease-out'
                : '-translate-x-full ease-in'
            }`}
        >
          <button className = {`
          lg:hidden
          absolute
          top-6 right-4 
          ${
              sidebarOpen
                ? 'translate-x-0 ease-out'
                : '-translate-x-full ease-in'
            }}`}
            onClick={() => setSidebarOpen(false)}>
            <AiOutlineClose color='#fff' size = {24}/>
          </button>
          <Menu.Brand>DevShop</Menu.Brand>
          <Menu.Nav>
            <Menu.NavItem href='/dashboard' Icon={AiFillPieChart} isSelected = {currentPage === 'dashboard'}>
              Informações gerais
            </Menu.NavItem>
            <Menu.NavItem href='/categories' Icon={MdCategory} isSelected = {currentPage === 'categories'}>
              Categorias
            </Menu.NavItem>
            <Menu.NavItem href='/products' Icon={AiFillGolden} isSelected = {currentPage === 'products'}>
              Produtos
            </Menu.NavItem>
            <Menu.NavItem href='/brands' Icon={BsFillGridFill} isSelected = {currentPage === 'brands'}>
              Marcas
            </Menu.NavItem>
            {data && data.panelGetMe && data.panelGetMe.role === 'admin' &&
              <Menu.NavItem href='/users' Icon={ImUser} isSelected = {currentPage === 'users'}>
              Usuarios
            </Menu.NavItem>
            }
            
          </Menu.Nav>
        </div>
        <div className='flex-1 flex flex-col overflow-hidden'>
          <header className='flex justify-between items-center py-4 px-6 bg-slate-900 border-b-2 border-gray-700 '>
            <div className='flex items-center'>
              <button
                onClick={() => setSidebarOpen(true)}
                className='text-gray-500 focus:outline-none lg:hidden'
              >
                <AiOutlineMenu color='#000' size = {24}/>
              </button>
            </div>
            <div className='flex items-center'>
              <div className='relative flex items-center'>
                <p className='mr-4 font-bold text-white'>
                  {data && data.panelGetMe && data.panelGetMe.name}
                </p>
                <button
                  onClick={openDropdown}
                  className='relative  bg-white flex flex-row items-center justify-center h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none'
                >
                  <FaUserAlt color='rgb(30, 41, 59)' />
                </button>
                <div
                  onClick={() => setDropdownOpen(false)}
                  className={`fixed inset-0 h-full w-full z-10 ${
                    dropdownOpen ? 'block' : ''
                  }`}
                  style={{ display: 'none' }}
                ></div>
                <div
                  className='absolute right-0 top-14 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 '
                  style={{ display: dropdownOpen ? 'block' : 'none' }}
                >
                  <button
                    onClick={logout}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-600 hover:text-white'
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main className='flex-1 overflow-x-hidden overflow-y-auto bg-slate-800'>
            <div className='container mx-auto px-6 py-8  h-full'>{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
