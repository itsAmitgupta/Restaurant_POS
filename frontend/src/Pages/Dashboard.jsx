import React from 'react'
import Navbar from '../Components/Navbar'
import Body from './Body'
function Dashboard() {
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
        <div className='w-full'>
            <Navbar/>
        </div>
        <div className=''>
            <Body/>
        </div>
    </div>
  )
}

export default Dashboard