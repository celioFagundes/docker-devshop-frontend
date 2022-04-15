import React from 'react'
const Input = ({
  type = 'text',
  placeholder = '',
  label = '',
  value,
  onChange,
  name = '',
  helpText,
  errorMessage = '',
  disabled,
  onBlur,
}) => {
  return (
    <div className='flex items-center justify-start w-full'>
      <div className='my-3 mr-2 bg-lightBlack py-3 px-3  w-full max-w-lg rounded-sm'>
        <div className='flex items-center w-full justify-start'>
          <label
            className='uppercase min-w-fit text-primary text-xs font-medium mb-2 mr-3'
            htmlFor={'id-' + name}
          >
            {label}
          </label>
          <input
            onBlur={onBlur}
            disabled={disabled}
            className='
              appearance-none 
               w-full
              py-1 px-3 mb-1 mr-2 
              bg-darkBlack text-gray-200 
              leading-tight 
              placeholder-gray-600
              focus:outline-none '
            type={type}
            id={'id-' + name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
          />
        </div>

        {helpText && (
          <p className='text-blue-200 text-xs italic my-1'>{helpText} </p>
        )}
      </div>
      {errorMessage && (
        <p className='text-red-400 text-xs italic my-1 sm:my-0'>
          {errorMessage}
        </p>
      )}
    </div>
  )
}

const InputCheckbox = ({ label = '', value, onChange, name = '', checked }) => {
  return (
    <div className='w-full flex flex-row justify-center items-center mr-2'>
      <label className='uppercase tracking-wide  text-gray-100 text-xs font-bold mr-2'>
        {label}
      </label>
      <input
        className='rounded-full'
        type='checkbox'
        id={'id-' + name}
        value={value}
        onChange={onChange}
        name={name}
        checked={checked}
      />
    </div>
  )
}
const InputColor = ({ 
  colorNameValue, 
  colorCodeValue,
  colorName,
  codeName,
  onChange, 
  bgColor = '#000',
  label,
  onBlur,
  disabled,
  type,
  placeholder,
  helpText,
  errorMessage 
}) => {
  return (
    <div className='flex items-center justify-start w-full'>
      <div className='my-3 mr-2 bg-lightBlack py-3 px-3  w-full max-w-lg rounded-sm'>
        <div className='flex items-center w-full justify-start'>
          <label
            className='uppercase min-w-fit text-primary text-xs font-medium mb-2 mr-3'
            htmlFor={'id-' + colorName}
          >
            {label}
          </label>
          <input
            onBlur={onBlur}
            disabled={disabled}
            className='
              appearance-none 
               w-full
              py-1 px-3 mb-1 mr-2 
              bg-darkBlack text-gray-200 
              leading-tight 
              placeholder-gray-600
              focus:outline-none '
            type={type}
            id={'id-' + colorName}
            placeholder={placeholder}
            value={colorNameValue}
            onChange={onChange}
            name={colorName}
          />
        </div>
        <div
          className='rounded-full h-6 w-6  flex flex-row items-center justify-center border-2 border-gray-300 mx-2 '
          style={{ backgroundColor: bgColor }}
        >
          <label
            className='text-transparent h-full w-full rounded-full hover:cursor-pointer'
            htmlFor={codeName && 'id-' + codeName}
            style={{ backgroundColor: bgColor }}
          >
            cor
          </label>
          <input
            className='hidden'
            type='color'
            id={'id-' + codeName}
            value={colorCodeValue}
            onChange={onChange}
            name={codeName}
          />
        </div>
        {helpText && (
          <p className='text-blue-200 text-xs italic my-1'>{helpText} </p>
        )}
      </div>
      {errorMessage && (
        <p className='text-red-400 text-xs italic my-1 sm:my-0'>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
const InputTextArea = ({
  placeholder = '',
  label = '',
  value,
  onChange,
  onBlur,
  name = '',
  helpText,
  errorMessage = '',
  disabled,
  textLength,
}) => {
  return (
    <div className='my-3 mr-2 bg-lightBlack py-3 px-3 rounded ? relative'>
      <label
        className='block uppercase tracking-wide  text-primary text-xs font-bold mb-2'
        htmlFor={name && 'id-' + name}
      >
        {label}
      </label>
      <textarea
        disabled={disabled}
        className='appearance-none h-52 block w-full bg-darkBlack text-gray-200 rounded-sm py-2 px-3  leading-tight focus:outline-none placeholder-gray-600'
        id={'id-' + name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      <p className=' text-blue-400 text-xs italic my-1 font-medium'>
        {' '}
        Length: {textLength}
      </p>
      {helpText && (
        <p className='text-blue-200 text-xs italic my-1'>{helpText} </p>
      )}
      {errorMessage && (
        <p className='text-red-500 text-xs italic'>{errorMessage}</p>
      )}
    </div>
  )
}
const InputVariation = ({
  type = 'text',
  placeholder = '',
  label = '',
  value,
  onChange,
  name = '',
  helpText,
  errorMessage = '',
  disabled,
  onBlur
}) => {
  return (
    <div className='mr-2 my-1 max-w-sm'>
      <label
        className='block uppercase tracking-wide text-primary text-xs font-bold mb-2'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <input
      onBlur = {onBlur}
        disabled={disabled}
        className='appearance-none block w-full bg-darkBlack text-gray-200  rounded-sm py-1 px-3  leading-tight focus:outline-none placeholder-gray-600'
        type={type}
        id={'id-' + name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {errorMessage && (
        <p className='text-red-400 text-xs italic mb-1'>{errorMessage}</p>
      )}
      {helpText && (
        <p className='text-blue-200 text-xs italicm mb-1'>{helpText} </p>
      )}
    </div>
  )
}

Input.Checkbox = InputCheckbox
Input.Color = InputColor
Input.TextArea = InputTextArea
Input.Variation = InputVariation
export default Input
