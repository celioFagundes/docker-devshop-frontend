import React from 'react'

const Table = ({ children }) => {
  return <table className='min-w-full my-2 '>{children}</table>
}

const TableHead = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}
const TableTh = ({ children }) => {
  return (
    <th className='px-6 py-3  bg-darkBlack text-white text-left text-xs leading-4 font-medium uppercase tracking-wider'>
      {children}
    </th>
  )
}

const TableBody = ({ children }) => {
  return <tbody className='bg-lightBlack rounded'>{children}</tbody>
}
const TableRow = ({ children }) => {
  return <tr >{children}</tr>
}
const TableTd = ({ children }) => {
  return (
    <td className='px-6 relative py-4 whitespace-no-wrap border-b border-gray-600'
      >{children}
    </td>
  )
}
Table.Head = TableHead
Table.Th = TableTh
Table.Row = TableRow
Table.Td = TableTd
Table.Body = TableBody
export default Table
