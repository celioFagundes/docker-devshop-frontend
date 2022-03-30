import React from 'react'

const Card = ({ children }) => {
  return (
    <div className='w-full mt-6 px-3 sm:w-1/2 '>
      <div className='flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-700'>
        {children}
      </div>
    </div>
  )
}

const CardIcon = ({ children }) => {
  return (
    <div className='p-3 rounded-full bg-pink-600 bg-opacity-75'>{children}</div>
  )
}
const CardData = ({ children }) => {
  return <div className='mx-5'>{children}</div>
}
const CardTitle = ({ children }) => {
  return <h4 className='text-2xl mb-4 font-semibold text-white'>{children}</h4>
}
const CardDescription = ({ children }) => {
  return <div className='text-white mr-5'>{children}</div>
}
Card.Icon = CardIcon
Card.Data = CardData
Card.Title = CardTitle
Card.Description = CardDescription

export default Card
