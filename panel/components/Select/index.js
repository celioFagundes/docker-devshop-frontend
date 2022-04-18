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
    <div className='mr-4 max-w-sm mb-2 bg-lightBlack py-3 px-3 rounded-sm'>
      <label
        className='block uppercase tracking-wide text-primary text-xs font-bold mb-2'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='
        appearance-none block w-full 
        placeholder-gray-600
        bg-darkBlack text-gray-200 
         rounded-sm py-1 px-4 my-1
         leading-tight focus:outline-none 
      '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden >
            Select
          </option>
        )}
        {options.map(opt => (
          <option id={opt.id} key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-400 text-xs italic'>{errorMessage}</p>
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
        className='block uppercase tracking-wide text-primary text-xs font-bold mb-2'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='
        appearance-none block w-20 
        bg-darkBlack text-gray-200 
         rounded-sm py-1 px-4  leading-tight 
        focus:outline-none '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden>
            Select
          </option>
        )}
        {options.map(opt => (
          <option id={opt} key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-400 text-xs italic'>{errorMessage}</p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText} </p>}
    </div>
  )
}
const SingleValuesHorizontal = ({
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
    <div className='flex items-center mr-4 max-w-sm'>
      <label
        className='block uppercase tracking-wide text-primary text-xs font-bold mr-3'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='
        appearance-none block w-fit
        bg-darkBlack text-gray-200 
         rounded-sm px-4  leading-tight py-1
        focus:outline-none '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden>
            Select
          </option>
        )}
        {options.map(opt => (
          <option id={opt} key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-400 text-xs italic'>{errorMessage}</p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText} </p>}
    </div>
  )
}
Select.SingleValues = SingleValues
Select.SingleValuesHorizontal = SingleValuesHorizontal
export default Select
