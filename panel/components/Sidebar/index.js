import React from 'react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'

const Sidebar = ({ children, sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`
  fixed  z-50 inset-y-0 left-0 lg:top-10 lg:w-11 lg:hover:w-64  transition-all duration-300 transform bg-darkBlack overflow-x-hidden overflow-y-auto lg:translate-x-0  '
  ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}
    >
      <button
        className={`
lg:hidden
absolute
top-6 right-4 
${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}}`}
        onClick={() => setSidebarOpen(false)}
      >
        <AiOutlineClose color='#fff' size={24} />
      </button>
      {children}
    </div>
  )
}

const SidebarNav = ({ children }) => {
  return <nav className='mt-14'>{children}</nav>
}
const SidebarNavItem = ({ children, href, Icon, isSelected }) => {
  return (
    <Link href={href}>
      <div
        className={`
      flex relative justify-start items-center 
      py-2  px-6 lg:px-2  mt-4
      text-white 
      
      hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-100 hover:cursor-pointer
      ${isSelected ? 'bg-lightGray text-gray-200 bg-opacity-25' : ''}`}
      >
        {Icon && <Icon size={24} />}

        <a
          className={`lg:fixed w-64 lg:left-10 items-center     font-bold `}
          href={href}
        >
          <span className='mx-1'>{children}</span>
        </a>
      </div>
    </Link>
  )
}

Sidebar.Nav = SidebarNav
Sidebar.NavItem = SidebarNavItem
export default Sidebar
