import React from 'react'
import { useEffect,useState } from 'react'
import { motion ,AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'
import state from '../store'
import {downloadCanvasToImage,reader} from '../config/helpers'
import { EditorTabs,FilterTabs,DecalTypes } from '../config/constants'
import { fadeAnimation,slideAnimation } from '../config/motion'
import { AIPicker,FilePicker,Tab,ColorPicker, CoustomButton } from '../Components'
import { download } from '../assets'

const Customizer = () => {
    const snap=useSnapshot(state)

    const [file, setfile] = useState('')
    const[prompt,setPrompt]=useState('')
    const [generateImg, setgenerateImg] = useState(false)
    const [activeEditorTab, setactiveEditorTab] = useState('')
    const [activeFilterTab, setactiveFilterTab] = useState({logoShirt:true,stylishShirt:false})

    const generateTabContent=()=>{

      
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker/>
            case "filepicker":
                return <FilePicker
                file={file}
                setfile={setfile}
                readFile={readFile}
                
                />
            case "aipicker" :
                return <AIPicker
                   prompt={prompt}
                   setPrompt={setPrompt}
                   generateImg={generateImg}
                   handleSubmit={handleSubmit}
                />      
               default:
               return null;
        }
    }
   
    const handleSubmit = async (type) => {
        if(!prompt) return alert("Please enter a prompt");
    
        try {
          setgenerateImg(true);
    
          const response = await fetch("http://localhost:8080/api/v1/dalle", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              prompt,
            })
          })
    
          const data = await response.json();
          console.log(data)
    
          handleDecals(type, `data:image/png;base64,${data.photo}`)
        } catch (error) {
          alert(error)
        } finally {
          setgenerateImg(false);
          setactiveEditorTab("");
        }
      }
    const handleDecals =(type,result)=>{
        const decalType=DecalTypes[type];
        state[decalType.stateProperty]=result;

        if(!activeFilterTab[decalType.filterTab]){
            handleActiveFilterTab(decalType.filterTab)
            
        }
    }

    const handleActiveFilterTab=(tabName)=>{
        switch (tabName) {
         case "logoShirt":
             state.isLogoTexture=!activeFilterTab[tabName]
             break;
         case "stylishShirt":
             state.isFullTexture=!activeFilterTab[tabName]
             break;
         default:
             state.isLogoTexture=true;
             state.isFullTexture=false;
             break;
        }
        setactiveFilterTab((prevState)=>{
           return{
            ...prevState,
            [tabName]:!prevState[tabName]
           }
        })
     }
     

    const readFile=(type)=>{
       reader(file).then((result)=>{
              handleDecals(type,result);
              setactiveEditorTab("");
       })
    }
  return (
   <AnimatePresence>
    {!snap.intro&&(
        <>
        <motion.div
        key='custom'
        className='absolute top-0 left-0  z-10'
        {...slideAnimation('left')}
        >
            <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                    {EditorTabs.map((tab)=>(
                        <Tab
                        key={tab.name}
                        tab={tab}
                        handleClick={()=>{setactiveEditorTab(tab.name)}}
                        />
                    ))}
                    {generateTabContent()}
                </div>
            </div>

        </motion.div>
        <motion.div className='absolute top-5 z-10 right-5' {...fadeAnimation}>
             <CoustomButton
             type='filled'
             title='Go back'
             handleClick={()=>state.intro=true}
             coustomStyles='w-fit px-4 py-2.5 font-bold text-sm'
             />
        </motion.div>
        <motion.div
        className='filtertabs-container'{...slideAnimation('up')}>
            {FilterTabs.map((tab)=>(
                        <Tab
                        key={tab.name}
                        tab={tab}
                        isFilterTab
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={()=>handleActiveFilterTab(tab.name)}
                        />
                    ))}
          <button className='download-btn' onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt='download_image' 
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
        </motion.div>
        </>
    )}
   </AnimatePresence>
  )
}

export default Customizer
