import React from 'react'
import chef from "../../assets/chef 1.png";

const serviceLists = [
    {
        id : 1,
        title : "Catering",
        des : "Delight your guest with our flavors and presentation",
        image : "../../assets/"

    },
    {
        id : 2,
        title : "Fast Delivery",
        des : "We deliver your order promptly to your door",
        image : "../../assets/"

    },
    {
        id : 3,
        title : "Online Ordering",
        des : "Explore menu & order with ease using our online banking",
        image : "../../assets/"

    },
    {
        id : 4,
        title : "Gifts Card",
        des : "Give the gifts of exceptional dining with foodi Gift Cards",
        image : "../../assets/"

    },

] 


const Service = () => {
  return (
    <div className='section-container my-24'>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 ">

            {/* text */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title ">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dinning experiences and offer exceptional services, blending culinary artistry with warm hospitality,
            </p>
            <button className='btn bg-green text-white px-8 py-3 rounded-full'>
                Explore
            </button>
            {/* avatar plugins */}
          </div>
        </div>
       {/* images */}
        <div className="md:w-1/2">
        <div className='grid sm:grid-cols-2  grid-cols-1 items-center'>
            {
                serviceLists.map((services)=>(
                  <div key={services.id} className='shadow-md rounded-sm cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border py-5 px-4 space-y-2 text-center '>
                        <img src={
                          services.image
                        } alt="" className='mx-auto' />
                        <h5 className='pt-3 font-semibold'>{services.title}</h5>
                        <p className='text-[#90bd95]'>{services.des}</p>
                  </div>
                ))
            }

          {/* <img src={chef} /> */}
          </div>
        </div>      
      </div>      
    </div>
  )
}

export default Service
