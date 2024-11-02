import React from 'react'
import { FaSearch } from "react-icons/fa";
import { TbUserCheck } from "react-icons/tb";
import { useState } from 'react';
import { GoQuestion } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";





const Navbar = () => {
     const [User, setUser] = useState('');


  return (
<header class="fixed shadow-md top-10 w-full h-14 bg-white z-50">
  <nav class="flex items-baseline p-3">
    <div class="text-xl font-bold text-right ml-20">RealMarket</div>

    <div class="flex items-center ml-10 gap-3 relative">
      <form class="flex items-center">
        <input
          className='w-64 p-2 bg-gray-200 text-black placeholder-gray-500 rounded-3xl pl-9'
          type='text'
          placeholder='Search products...'
        />
        <div className="absolute left-2">
          <FaSearch className="text-gray-500" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2"
        >
          Search
        </button>
      </form>
    </div>

    <ul class="flex space-x-4 ml-40">
       <div class="flex items-center bg-blue-500 text-white px-4 py-2 rounded-3xl gap-2">
        <TbUserCheck class="text-white" /> {/* Icon for the dropdown */}
        <select
          class="bg-blue-500 text-white outline-none"
          id="User"
          name="User"
          value={User}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="" disabled>Hi, {sessionStorage.getItem('username')}</option>

          <option value="myaccount">My Account</option>
          <option value="hausa">Orders</option>
          <option value="yoruba">Inbox</option>
          <option value="igbo">SavedItems</option>
        </select>
      </div> 


      <div class="flex items-center bg-blue-500 text-white px-4 py-2 rounded-3xl gap-2">
        <GoQuestion class="text-white" /> {/* Icon for the dropdown */}
        <select
          class="bg-blue-500 text-white outline-none"
          id="User"
          name="User"
          value={User}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="" disabled>Help</option>

          <option value="myaccount">Help center</option>
          <option value="hausa">Place an Order</option>
          <option value="yoruba">Payment option</option>
          <option value="igbo">Track an order</option>
          <option value="igbo">Cancel an order</option>
          <option value="igbo">Refunds and Refund</option>

        </select>
      </div>
     <div>
      <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-3xl ml-2 flex"
        >
          <div className="text-left mt-1 mr-2">
          <GiShoppingCart className="text-gray-500" />
        </div>
          Cart
          
        </button>

       
        </div>
    </ul>

    
  </nav>
</header>


  )
}

export default Navbar
//flex items-center justify-between p-4
