import React, {useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import Riding from './Riding'

const Home = () => {
  const [ pickup,setPickup] = useState('')
  const [destination,setDestination] = useState('')
  const [panelOpen,setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehicleFoundPanelRef = useRef(null)
    const waitingForDriverPanelRef = useRef(null)
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriverPanel,setwaitingForDriverPanel] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault();
  }
  useGSAP(function(){
    if(panelOpen){
        gsap.to(panelRef.current,{
        height:'70%',
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current,{
        height:'0%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
        gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
        gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
        gsap.to(vehicleFoundPanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleFoundPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriverPanel){
        gsap.to(waitingForDriverPanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else{
      gsap.to(waitingForDriverPanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[waitingForDriverPanel])


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 ' src='https://imgs.search.brave.com/AE-5-1MuVyC6kalBtX6eptghTrDhJnq4rAOJqZtPmQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM1LzAx/L2Y1LzM1MDFmNTBk/ZWE4MTI2ZWUwM2Zi/OTE3NmM0ZGFlMmRh/LmpwZw'></img>
      <div className='h-screen w-screen '>
        <img src='https://imgs.search.brave.com/QNWNi5wdONhlYZH0C7nDUkZ8pjvuNmVZXz2xqq_Kep8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90b3ktY2FyLXB1/c2gtcGluLW1hcC10/cmF2ZWxsaW5nLWNv/bmNlcHQtc2hhbGxv/dy1kZXB0aC1maWVs/ZF8zNTM3OC0xMTYu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw' alt='' className='h-full w-full object-cover'></img>
      </div>
      <div className='absolute top-0 w-full h-screen flex flex-col justify-end'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold '>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className='line absolute h-16 w-1 top-[29%] rounded-full left-10 bg-gray-900'></div>
            <input value={pickup} onChange={(e)=>{
              setPickup(e.target.value)
            }} onClick={()=>{setPanelOpen(true)}} type='text' placeholder='Add a pic up location' className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-2'></input>
            <input value={destination} onChange={(e)=>setDestination(e.target.value)} onClick={()=>{setPanelOpen(true)}} type='text' placeholder='Add your destination' className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-2'></input>
          </form>
        </div>
        <div className='h-0 bg-white' ref={panelRef}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setvehiclePanel={setvehiclePanel}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 px-3 py-8 bg-white w-full translate-y-full'>
        <VehiclePanel setVehiclePanel={setvehiclePanel} setconfirmRidePanel={setconfirmRidePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 px-3 py-8 bg-white w-full translate-y-full'>
        <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}/>
      </div>

      <div ref={vehicleFoundPanelRef} className='fixed z-10 bottom-0 px-3 py-8 bg-white w-full translate-y-full'>
        <LookingForDriver setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}/>
      </div>

      <div ref={waitingForDriverPanelRef} className='fixed z-10 bottom-0 px-3 py-8 bg-white w-full'>
        {<WaitingForDriver setwaitingForDriverPanel={setwaitingForDriverPanel}/>}
      </div>

      
    </div>
  )
}

export default Home