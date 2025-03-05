import React from 'react'
import { Link} from 'react-router-dom'

const AboutPage = () => {
  return <>
  
  
  <div className="flex justify-center items-center h-screen bg-gray-100">
  <div className="max-w-3xl mx-auto flex flex-row items-center bg-white p-6 rounded-lg shadow-lg space-x-6">
    {/* Profile Image */}
    <img src="./jf.png" 
      alt="Emaan Arora" 
      className="w-20 h-20 object-cover object-center rounded-full" />
    
    {/* Text Content */}
    <div className="flex-1">
      <p className="font-sans antialiased font-bold text-lg md:text-xl lg:text-2xl text-current mb-2">
        "Job.find is a platform built by Emaan using the M.E.R.N stack that allows individuals to showcase their job preferences. Companies can access this information to identify potential candidates for future hiring opportunities."
      </p>
      <p className="font-sans antialiased text-base text-stone-600 font-bold">Emaan Arora</p>
      <p className="font-sans antialiased text-sm text-stone-500">M.E.R.N Stack Developer</p>
      <br />
      <Link to='/home'><button className=" cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Go back</button>       </Link>
    </div>
    

    {/* Rating Stars */}
    <div className="flex space-x-1 text-amber-500">
      {[...Array(4)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
        </svg>
      ))}
      {/* Half Star */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
      </svg>
     
    </div>
   
  </div>
  <br />
</div>




  </>
}

export default AboutPage