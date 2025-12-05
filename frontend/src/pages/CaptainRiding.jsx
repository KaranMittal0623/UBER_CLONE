import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import 'remixicon/fonts/remixicon.css'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function(){
    if(finishRidePanel){
        gsap.to(finishRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(finishRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[finishRidePanel])

  return (
    <div className='h-screen relative'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src='https://imgs.search.brave.com/AE-5-1MuVyC6kalBtX6eptghTrDhJnq4rAOJqZtPmQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM1LzAx/L2Y1LzM1MDFmNTBk/ZWE4MTI2ZWUwM2Zi/OTE3NmM0ZGFlMmRh/LmpwZw'></img>
          <Link to='/captain-home' className='h--10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-logout-box-r-line text-lg font-medium"></i>
        </Link>
        </div>

        <div className='h-4/5'>
            <img src='https://imgs.search.brave.com/QNWNi5wdONhlYZH0C7nDUkZ8pjvuNmVZXz2xqq_Kep8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90b3ktY2FyLXB1/c2gtcGluLW1hcC10/cmF2ZWxsaW5nLWNv/bmNlcHQtc2hhbGxv/dy1kZXB0aC1maWVs/ZF8zNTM3OC0xMTYu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw' alt='' className='h-full w-full object-cover'></img>
        </div>
        <div onClick={()=>{
            setfinishRidePanel(true)
        }} className='h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative'>
        <h5 onClick={()=>{
          
        }} className='p-1 text-center absolute top-0 w-[95%]'><i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i></h5>
           <h4 className='text-xl font-semibold'>4KM away</h4>
           <button className='w-full bg-green-600 text-white font-bold p-2 rounded-xl mt-4'>Complete Ride</button>
        </div>

        <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 px-3 py-8 bg-white tranlate-y-full w-full h-screen'>
          {<FinishRide setfinishRidePanel={setfinishRidePanel}/>}
      </div>
    </div>
  )
}

export default CaptainRiding