import React from 'react'

const footer = () => {
  return (
    <div className='flex justify-center items-center bottom-0 p-24 bg-slate-800 text-white text-4xl gap-2'>
        <h1 className='text-2xl font-bold text-green-500'>
          <span>&lt;</span>
          <span>Pass</span><span>OP/&gt;</span>
          
        </h1>
    <span><img src="icons/heart.webp" width={30} className='rounded-xl' alt="" /></span>
    Created by Vasu
    </div>
  )
}

export default footer
