import React from 'react'

const FormField = ({ LableName, type, name, palceholder, value, handleChange, isSurpriseMe, hanldeSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >{LableName}</label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={hanldeSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
          >Surprise Me</button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={palceholder}
        value={value}
        onChange={handleChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#3639ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormField

