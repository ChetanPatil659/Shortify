import React from 'react'

function TextInput(props) {
  return (
    <div className='flex flex-col w-[90%] max-w-lg text-gray-600'>
        {props.label && <label htmlFor=''>{props.label}</label>}
        <input 
            className='
                border-2 border-slate-600 px-3 py-2 rounded
            '
            type={props.type} 
            placeholder={props.placeholder} 
            onChange={(e)=>props.handleChange(e.target.value)}
        />
    </div>
  )
}

export default TextInput