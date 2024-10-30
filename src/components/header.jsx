import React from 'react'



const Header = () => {
  return (
     <header className='grid place-items-center fixed top-0 w-full h-14 bg-black z-40'>
     <div className='container mx-auto px-4 flex items-center gap-3 justify-center'>
       <h2 className='text-white text-sm'>
         Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
       </h2>
       <button className='text-white text-sm'>Shop Now</button>
     </div>
   </header>
   
  )
}

export default Header
