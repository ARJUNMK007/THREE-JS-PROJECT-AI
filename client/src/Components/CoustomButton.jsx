import React from 'react'

import state from '../store'
import { useSnapshot } from 'valtio'

import { getContrastingColor } from '../config/helpers'

function CoustomButton({type,title,handleClick,coustomStyles}) {

const generateStyles=(type)=>{
  if(type==='filled'){
     return{
      backgroundColor:snap.color,
      color:getContrastingColor(snap.color)
      
     }
  }else if(type==='outline'){
    return{
      borderWidth:'1px',
      borderColor:snap.color,
      color:snap.color
    }
  }
}
const snap=useSnapshot(state)
  return (
  <button 
  onClick={handleClick}
  className={`px-2 py-1.5 flex-1 rounded-md ${coustomStyles}`}
  style={generateStyles(type)}
  >
    {title}
  </button>
  )
}

export default CoustomButton
