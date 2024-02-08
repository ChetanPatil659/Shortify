import React from 'react'

const style = {
    primary:'bg-[#417B5A] text-white outline-red-800 hover:bg-[#417B5A]/95',
    secondary: 'text-[#417B5A] hover:bg-[#417B5A] hover:text-white'
}

function Button(props) {
  return (
    <button 
        className=
        {`w-[90%] align-center py-2 rounded max-w-lg border-[#417B5A] border-2 ${props.type=='primary' && style.primary} ${props.type=='secondary' && style.secondary}`}
        onClick={()=>props.handleClick()}
    >
        {props.text}
    </button>
  )
}

export default Button