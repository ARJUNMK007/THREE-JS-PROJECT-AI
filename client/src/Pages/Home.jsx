import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'

import {headContainerAnimation,headContentAnimation,
    headTextAnimation,slideAnimation} from '../config/motion'
import {CoustomButton} from '../Components'

const Home = () => {
    const snap=useSnapshot(state)
  return (
   <AnimatePresence>
    {snap.intro && ( 
        <motion.section className='home' {...slideAnimation('left')}>  
              <motion.header {...slideAnimation('top')}>
                <img src='./threejs.png'
                alt='logo'
                className='w-8 h-8 onject-contain'/>
              </motion.header>
              <motion.div className='home-content'{...headContainerAnimation}>
                   <motion.div {...headTextAnimation}>
                      <h1 className='head-text'>
                         LET'S <br className='xl:block hidden'/>DO IT
                      </h1>
                   </motion.div>
                   <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                    <p className='max-w-md font--normal text-grey-600 text-base'>
                        Create Your Unique and Exclusive T-shirt 
                        With our brand new 3D coustomization tool.
                        <strong>Unleash Imagination</strong>{""}
                        define your own style

                    </p>
                    <CoustomButton
                    type='filled'
                    title='Customize-It'
                    handleClick={()=>state.intro=false}
                    coustomStyles='w-fit px-4 py-2.25 font-bold text-sm'

                    />
                   </motion.div>
              </motion.div>
        </motion.section>
    )}
   </AnimatePresence>
  )
}

export default Home
