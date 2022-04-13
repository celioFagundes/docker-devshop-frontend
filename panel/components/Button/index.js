import Link from 'next/link'
import React from 'react'

const Button = ({ children, type = 'text' , onClick}) => {
  return (
    <button
      type={type}
      onClick ={onClick}
      className='bg-primary my-2 max-w-xs hover:bg-slate-200 text-gray-700 font-bold py-2 px-4 rounded'
    >
      {children}
    </button>
  )
}
const ButtonLink = ({ href, children }) => {
  return (

    <Link href={href}>
      <a className='bg-lightBlack hover:bg-slate-200 text-white font-medium py-2 px-4 border border-white rounded-lg uppercase'>
        {children}
      </a>
    </Link>
  )
}
const ButtonCard = ({ href, children, Icon }) => {
  return (
    
      <Link href={href}>
        <div className='
        flex items-center justify-between w-max 
        bg-lightBlack 
        hover:bg-darkBlack hover:cursor-pointer
        text-white font-medium uppercase
        border border-lightBlack rounded 
        '>
        {Icon &&
          <div className='bg-darkBlack py-3 px-3'>
             <Icon size = {22} color = '#fff'/>
          </div>
         }
        <a className=' py-3 px-3'>
        {children}
      </a>
        </div>
    </Link>

  )
}
const ButtonLinkOutline = ({ href, children }) => {
  return (
    <Link href={href}>
      <a
        className='bg-transparent hover:bg-white text-white font-semibold hover:text-gray-800 py-2 px-4 border border-white hover:border-transparent rounded
'
      >
        {children}
      </a>
    </Link>
  )
}

Button.Link = ButtonLink
Button.LinkOutline = ButtonLinkOutline
Button.Card = ButtonCard
export default Button
