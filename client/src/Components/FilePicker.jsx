import React from 'react'
import CoustomButton from './CoustomButton'

const FilePicker =({file,setfile,readFile})=> {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
       <input
       id='file-upload'
       type='file'
       accept='images/*'
       onChange={(e)=>setfile(e.target.files[0])}
       
       />
      {console.log(setfile)}
       <label htmlFor='file-upload' className='filepicker-label'>Upload-File</label>
       <p className='mt-2 text-gray-500 text-xs truncate'> 
        {file===''?'No file choosen':file.name}
        
       </p>
      </div>
      <div className='mt-4  flex flex-wrap gap-3'>
         <CoustomButton
         type='outline'
         title='Logo'
         handleClick={()=>readFile('logo')}
         coustomStyles='text-xs'
         />
         <CoustomButton
         type='filled'
         title='Full'
         handleClick={()=>readFile('full')}
         coustomStyles='text-xs'
         />
      </div>
    </div>
  )
}

export default FilePicker