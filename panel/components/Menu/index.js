import React from 'react'
import Link from 'next/link'
import { RiShoppingBag3Fill } from 'react-icons/ri'

const Menu = ({ children }) => {
  return <div>{children}</div>
}

const MenuNav = ({ children }) => {
  return <nav className='mt-10'>{children}</nav>
}
const MenuBrand = ({ children }) => {
  
  
  return (
    <div className='flex items-center justify-center mt-8'>
      <div className='flex items-center'>
        < RiShoppingBag3Fill color = '#fff' size = {28}/>


        <span className='text-white text-2xl mx-2 font-semibold'>
          {children}
        </span>
      </div>
    </div>
  )
}
const MenuNavItem = ({ children, href , Icon, isSelected}) => {
  return (
    <Link href={href}>
      <a
        className={`flex items-center mt-4 py-2 px-6 text-white hover:bg-gray-100 hover:bg-opacity-25 hover:text-gray-100 ${isSelected ? 'bg-gray-100 bg-opacity-25' : ''}`}
        href={href}
      >
       {Icon &&   <Icon size = {24}/>}
        <span className='mx-3'>{children}</span>
      </a>
    </Link>
  )
}

Menu.Nav = MenuNav
Menu.Brand = MenuBrand
Menu.NavItem = MenuNavItem
export default Menu
