import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
      const [vehiclePlate, setVehiclePlate] = useState('')
      const [vehicleCapacity, setVehicleCapacity] = useState('')
      const [vehicleType, setVehicleType] = useState('')
    const {captain, setCaptain} = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
      e.preventDefault()
      
      const captainData = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email,
        password,
        vehicle:{
          capacity:vehicleCapacity,
          color:vehicleColor,
          plate:vehiclePlate,
          vehicleType
        }
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
      if((await response).status === 201){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
      
      console.log(captainData)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setVehicleCapacity('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleType('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
          <div>
            <img className='w-20 h-14 ml-0 mb-10 rounded' src='https://toppng.com/uploads/preview/uber-logo-png-uber-logo-2018-11563110096yltfjpzwbm.png'></img>
          <form onSubmit={(e)=>{
            submitHandler(e)
    
          }}>
            <h3 className='text-base font-medium  mb-2'>What's your name</h3>
            <div className='flex gap-4'>
              <input type="text" placeholder='First name' required onChange={(e)=>{
                setFirstName(e.target.value)
              }} value={firstName} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
              <input type="text" placeholder='Last name' required onChange={(e)=>{
                setLastName(e.target.value)
              }} value={lastName} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
            </div>
    
            <h3 className='text-base font-medium  mb-2'>What's your email</h3>
            <input type="email" placeholder='Your email' required onChange={(e)=>{
                setEmail(e.target.value)
              }} value={email} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
    
            <h3 className='text-base font-medium  mb-2'>Enter Password</h3>
            <input type="password" placeholder='Your password' required onChange={(e)=>{
                setPassword(e.target.value)
              }} value={password} className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
            <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-4 mb-5'>
              <input type="text" placeholder='Vehicle Color' required onChange={(e)=>{
                setVehicleColor(e.target.value)
              }} value={vehicleColor} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
              <input type="text" placeholder='Vehicle Plate' required onChange={(e)=>{
                setVehiclePlate(e.target.value)
              }} value={vehiclePlate} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
            </div>

            <div className='flex gap-4 mb-5'>
              <input type="number" placeholder='Vehicle Capacity' required onChange={(e)=>{
                setVehicleCapacity(e.target.value)
              }} value={vehicleCapacity} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'/>
              <select required onChange={(e)=>{
                setVehicleType(e.target.value)
              }} value={vehicleType} className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base'>
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
    
            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
    
            <p className='text-center'>Already have a account?<Link className='text-blue-600 ' to='/captain-login'> Login here</Link></p>
          </form>
          </div>
          <div>
            <p className='text-xs leading-tight'>
              By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>
  )
}

export default CaptainSignup