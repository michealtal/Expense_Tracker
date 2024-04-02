import React from 'react'
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { fetchData } from '../helpers'
//asset  import 
import wave from "../assets/wave.svg";
//component
import Nav from '../component/Nav';

//loader
export function MainLoader (){
   const userName = fetchData("userName");
   return{ userName}
}
const MainPage = () => {
 const {userName} = useLoaderData()
  return (
    <div className='layout'>
      <Nav userName ={userName}/>
       <main>
        <Outlet /> 
       </main>
       <img src={wave} alt="" />
        </div>
  )
}

export default MainPage