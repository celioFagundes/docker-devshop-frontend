import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const Button = ({ children, type = 'text', onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='bg-lightBlack my-1 max-w-xs hover:bg-secondary text-white font-bold py-1 px-4 rounded-sm'
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
      <div
        className='
        flex items-center justify-between w-max 
        bg-lightBlack 
        hover:bg-darkBlack hover:cursor-pointer
        text-white font-medium uppercase
        border border-lightBlack rounded 
        '
      >
        {Icon && (
          <div className='bg-darkBlack py-3 px-3'>
            <Icon size={22} color='#fff' />
          </div>
        )}
        <a className=' py-3 px-3'>{children}</a>
      </div>
    </Link>
  )
}
const ButtonLinkBack = ({ href, children }) => {
  return (
    <Link href={href}>
      <div
        className='
        flex items-center justify-between w-max
        bg-lightBlack 
        hover:bg-darkBlack hover:cursor-pointer
        text-white font-medium uppercase
         rounded-t 
        '
      >
        <div className='bg-darkBlack py-1 px-3 h-full border border-darkBlack'>
          <BiArrowBack size={22} color='#fff' />
        </div>
        <a className=' py-1 px-3'>{children}</a>
      </div>
    </Link>
  )
}

Button.Link = ButtonLink
Button.LinkBack = ButtonLinkBack
Button.Card = ButtonCard
export default Button
