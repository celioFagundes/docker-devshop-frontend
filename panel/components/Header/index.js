import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'

const Header = ({openMenu, user}) => {
const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const openDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const logout = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    localStorage.clear()
    router.push('/')
  }
  return (
    <header className='flex justify-between items-center py-2 px-6 bg-primary '>
      <div className='flex items-center lg:hidden'>
        <button
          onClick={openMenu}
          className='text-gray-500 focus:outline-none lg:hidden'
        >
          <AiOutlineMenu color='#000' size={24} />
        </button>
      </div>
      <div className='flex items-start justify-start px-6 '>
        
        <img src={'/logo.svg'} />
        <p className='text-white ml-2 font-medium'>ADMIN</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='relative flex items-center'>
          <p className='mr-4 font-bold text-white'>
            {user}
          </p>
          <button
            onClick={openDropdown}
            className='relative  bg-white flex flex-row items-center justify-center h-6 w-6 rounded-full overflow-hidden shadow focus:outline-none'
          >
            <FaUserAlt color='rgb(30, 41, 59)' size ={12}/>
          </button>
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
  )
}

export default Header
