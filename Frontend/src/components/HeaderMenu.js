import React from "react";
import { FaBitcoin, FaNewspaper } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import {
  FcMoneyTransfer,
  FcReading,
  FcSettings,
  FcManager,
} from "react-icons/fc";
import { Link,useNavigate } from "react-router-dom";

const Headermenu = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
   navigate('/Login')
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <Link to={'/'}>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">
              Stock Ex
            </span>
          </div>
        </Link>
        {localStorage.getItem("token") ? (<>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Home</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-left lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to={"/crypto"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Crypto
            </Link>
            <Link
              to={"/stocks"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Stocks
            </Link>
            <Link
              to={"/news"}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              News
            </Link>
          </div>
          <div>
          
               <button onClick={handleLogout} className=" inline-block  mx-2text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
               Logout
             </button>
              
            
            <Link
              to={"/portfolio"}
              className="inline-block mx-2 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              PORTFOLIO
            </Link>
            </div>
        </div>
            </>):(<>
         
          <Link
              to={"/Login"}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto  mt-4 lg:mt-0"
            >
              LOGIN
            </Link>
            <Link
              to={"/Signup"}
              className="inline-block  text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mx-1 mt-4 lg:mt-0"
            >
              SIGNUP
            </Link></>)}
           
        
      </nav>
    </>)
  
};

export default Headermenu;
