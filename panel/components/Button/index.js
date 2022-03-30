import Link from 'next/link'
import React from 'react'

const Button = ({ children, type = 'text' , onClick}) => {
  return (
    <button
      type={type}
      onClick ={onClick}
      className='bg-white my-2 max-w-xs hover:bg-slate-200 text-gray-700 font-bold py-2 px-4 rounded'
    >
      {children}
    </button>
  )
}
const ButtonLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='bg-white  hover:bg-slate-200 text-gray-700 font-bold py-2 px-4 border border-white rounded'>
        {children}
      </a>
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
export default Button
