import React from 'react'
import CoustomButton from './CoustomButton'

const AIPicker = ({prompt,setPrompt,generateImg,handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea className='aipicker-textarea' 
      placeholder='ask AI to generate image for you'
      rows={5}
       value={prompt}
       onChange={(e)=>setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generateImg?(
        <CoustomButton
        type="outline"
        title="Asking AI.."
        coustomStyles="text-xs"
        />):(
          <>
          <CoustomButton
          type="outline"
          title="AI Logo"
          handleClick={()=>handleSubmit('logo')}
          coustomStyles="text-xs"
          />
          <CoustomButton
          type="filled"
          title="AI Full Image"
          handleClick={()=>handleSubmit('full')}
          coustomStyles="text-xs"
          />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker
