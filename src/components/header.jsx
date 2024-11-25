import React from 'react'
import { useState } from 'react';




const Header = () => {
  
     const [Language, setLanguage] = useState('');

  return (

<header className='grid place-items-center fixed top-0 w-full h-12 bg-black z-40'>
  <div className='container mx-auto px-2 md:px-4 flex items-center gap-2 md:gap-3 justify-center'>
    <h2 className='text-white text-[10px] md:text-xs lg:text-sm'>
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
    </h2>

    {/* Wrapper for Button and Dropdown with gap for spacing */}
    <div className='flex items-center gap-2 md:gap-4'>
      <button className='text-white text-[10px] md:text-xs'>Shop Now</button>
      <div className='relative md:absolute md:right-20'>
        <select
          className='bg-black border-none text-white text-[10px] md:text-xs'
          id='Language'
          name='Language'
          value={Language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value='english'>English</option>
          <option value='hausa'>Hausa</option>
          <option value='yoruba'>Yoruba</option>
          <option value='igbo'>Igbo</option>
        </select>
      </div>
    </div>
  </div>
</header>



   
  )
}

export default Header
