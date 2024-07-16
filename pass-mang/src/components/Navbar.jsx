import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around items-center bg-purple-400'>
      <div className='font-bold logo py-4'>PassOp</div>
        <ul className=''>
            <li className='flex gap-4'>
              <a className='hover:font-bold' href="/">Home</a>
              <a className='hover:font-bold' href="#">About</a>
              <a className='hover:font-bold' href="#">Contact Us</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
