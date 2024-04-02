import React from 'react'
import { useRouteError,Link, useNavigate } from 'react-router-dom'
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();
  return (
    <div className='error'>
        <h2>Oppps😦😦😦</h2>
        <h3>Sorry We've got a problem</h3>
           <p>{error.message || error.status}</p>
           <div className='flex-md '>
            <button className='btn btn--dark' onClick={() => navigate(-1)}>
               <ArrowUturnLeftIcon width={20} />
               <span>Go Back</span>
            </button>
            <Link to="/" className='btn btn--dark'>
              <span>Go Home</span>
              <HomeIcon width={20}/>
            </Link>
           </div>
    </div>
  )
}

export default Error