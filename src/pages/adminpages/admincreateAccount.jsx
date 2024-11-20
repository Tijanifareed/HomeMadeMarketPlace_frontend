import React, { useState } from 'react';
import Admin from '../Admin.svg'


const AdmincreateAccount = () => {
     const [userName, setUserName] = useState('');
     const [password, setPassword] = useState('');
   
     const handleSubmit = async (e) => {
       e.preventDefault();
   
       try {
         const response = await fetch("http://localhost:8080/create_adminAccount", {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             userName,
             password,
             // Include phone number in request
           }),
         });
   
         const responseData = await response.json();
   
         if (response.ok) {
           alert('Sign-Up Successful');
        //    sessionStorage.setItem('token', responseData.token); 
           window.location.href = '/login'; // Redirect to the homepage
         } else {
             console.error(responseData);
           alert('Error: ' + responseData.data);
         }
       } catch (error) {
         console.error('Error:', error.data);
         alert('An error occurred: ' + error.data);
       }
     };
   
     return (
       <div className="mt-[47px] flex items-center gap-8">
         <img 
           className="w-[100%] sm:w-[400px] sm:h-[350px] md:w-[490px] md:h-[450px] lg:w-[600px] lg:h-[520px] object-cover" 
           src={Admin}
           alt="Description" 
           style={{ flexShrink: 0 }}
         />
   
         <div className="flex flex-col items-center text-center max-w-[400px] w-full mx-auto pr-6">
           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
             Sign Up for RealMarket As Admin
           </h1>
           <p className="text-gray-600 text-sm md:text-base mb-6">
             Create account with username and password
           </p>
   
           <form className="w-full" onSubmit={handleSubmit}>
             <input
               className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
               type="text"
               placeholder="Username"
               value={userName}
               onChange={(e) => setUserName(e.target.value)}
             />
            
             <input
               className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-4"
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
             
             {/* <select
               className="w-full text-gray-800 placeholder-gray-500 p-2 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none mb-6"
               value={role}
               onChange={(e) => setRole(e.target.value)}
             >
               <option value="" disabled>Select Role...</option>   
               <option value="SELLER">Seller</option>
               <option value="BUYER">Buyer</option>
             </select> */}
             <button
               type="submit"
               className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200"
             >
               Sign Up
             </button>
           </form>
   
           <p className="text-gray-600 text-sm md:text-base mt-4">
             Already created an account?{' '}
             <a href="/adminloginpage" className="text-blue-600 hover:underline">
               Login 
             </a>
           </p>
         </div>
       </div>
     );
}

export default AdmincreateAccount
