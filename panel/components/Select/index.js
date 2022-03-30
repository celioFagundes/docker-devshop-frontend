import React from 'react'

const Select = ({
  placeholder = '',
  label = '',
  value,
  onChange,
  onBlur,
  name = '',
  helpText,
  oldValue = '',
  options = [],
  errorMessage,
}) => {
  return (
    <div className='mr-4 max-w-sm mb-2'>
      <label
        className='block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500 '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden>
            Selecionar
          </option>
        )}
        {options.map(opt => (
          <option id={opt.id} key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-500 text-xs italic'>{errorMessage}</p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText} </p>}
    </div>
  )
}
const SingleValues = ({
  placeholder = '',
  label = '',
  value,
  onChange,
  onBlur,
  name = '',
  helpText,
  oldValue = '',
  options = [],
  errorMessage,
}) => {
  return (
    <div className='mr-4 max-w-sm mb-2'>
      <label
        className='block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='appearance-none block w-20 bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500 '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden>
            Selecionar
          </option>
        )}
        {options.map(opt => (
          <option id={opt} key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-500 text-xs italic'>{errorMessage}</p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText} </p>}
    </div>
  )
}
Select.SingleValues = SingleValues
export default Select
