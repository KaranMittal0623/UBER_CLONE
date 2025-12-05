import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
              <div className='flex items-center justify-start gap-3'>
                <img className='w-10 h-10 rounded-full object-cover' src='https://imgs.search.brave.com/07pPTSiew3FQ023Y4k-EwK9fXiwoJRUvS-XimFNmtQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIy/NDU1NTA2MC9waG90/by9hZGFwdGluZy10/aGUtbmV3LW5vcm1h/bC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9SU54Vk51ampw/dDViXzc5LTZrNVBC/Vi1vbG9Uc05SUUhw/YXdBR01DNkctND0'></img>
                <h4 className='text-lg font-medium'>Harsh Patel</h4>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>Rs. 295.2</h4>
                <p className='text-sm font-medium text-gray-600'>Earned</p>
              </div>
           </div>

           <div className='flex justify-center gap-5 items-start p-3 bg-gray-100 rounded-2xl mt-6'>
            <div className='text-center'>
              <i className="ri-timer-line  text-3xl font-extralight "></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600 '>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="ri-speed-up-line text-3xl font-extralight "></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600 '>Hours Online</p>
            </div>
            <div className='text-center'>
              <i className="ri-booklet-line text-3xl font-extralight "></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600 '>Hours Online</p>
            </div>
           </div>
    </div>
  )
}

export default CaptainDetails