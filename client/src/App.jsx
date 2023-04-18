import React from "react"
import Canvas from "./Canvas"
import Customizer from "./Pages/Customizer"
import Home from "./Pages/Home"
import { Center } from "@react-three/drei"

function App() {
  

  return (
    <div >
      <Home/> 
      <Canvas/> 
      <Customizer/>
    </div>
  )
}

export default App
