import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
          props.setfinishRidePanel(false)
        }} className='p-1 text-center absolute top-0 w-[93%]'><i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i></h5>
        <h3 className='text-2xl font-bold mb-5'>Finish this Ride!</h3>

        <div className='flex items-center justify-between mt-4 p-2 bg-yellow-400 rounded-lg'>
            <div className='flex items-center gap-3 mt-4'>
                <img className='h-12 w-12 rounded-full object-cover' src='https://imgs.search.brave.com/07pPTSiew3FQ023Y4k-EwK9fXiwoJRUvS-XimFNmtQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIy/NDU1NTA2MC9waG90/by9hZGFwdGluZy10/aGUtbmV3LW5vcm1h/bC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9SU54Vk51ampw/dDViXzc5LTZrNVBC/Vi1vbG9Uc05SUUhw/YXdBR01DNkctND0'></img>
                <h2 className='text-lg font-medium'>Harsh Patel</h2>
            </div>
            <h5 className='text-lg font-semibold '>2.2Km </h5>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full'>
                <div className='flex items-center gap-5 border-2 border-black rounded-lg mt-2'>
                    <i className="ri-map-pin-line text-xl font-bold ml-2"></i>
                    <div className=''>
                        <h3 className='text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>

                <div className='flex items-center gap-5  border-2 border-black rounded-lg mt-4'>
                    <i className="ri-map-pin-line text-xl font-bold ml-2"></i>
                    <div className=''>
                        <h3 className='text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>

                <div className='flex items-center gap-5 border-2 border-black rounded-lg mt-4'>
                    <i className="ri-map-pin-line text-xl font-bold ml-2"></i>
                    <div className=''>
                        <h3 className='text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm text-gray-600 -mt-1'>Kankariya Talab, Bhopal</p>
                    </div>
                </div>
            </div>

            <div className='mt-6 w-screen'> 
                <Link to='/captain-riding' className='w-full bg-green-600 flex justify-center  text-white font-bold p-2 rounded-xl mt-4 text-xl'>Complete the Ride</Link>    
            </div>
        </div>
    </div>
  )
}

export default FinishRide