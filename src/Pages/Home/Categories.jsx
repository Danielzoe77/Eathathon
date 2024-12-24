import React from 'react'
import img1 from '../../assets/pexels-photo-1132047.jpeg'
import img2 from '../../assets/salad.jpg'
import img3 from '../../assets/summer-desserts.jpg'
import img4 from '../../assets/breakfast.jpg'

const categoryItems = [
    {
        id: 1,
        title: 'Fruits',
        image: img1,
        des: '(23 dishes)',
    },
    {
      id: 2,
      title: 'Salad',
      image: img2,
      des: '(23 dishes)',
  },
  
 { id: 3,
  title: 'Dessert',
  image: img3,
  des: '(23 dishes)',},
  
  { id: 3,
    title: 'Browse All',
    image: img4,
    des: '(23 items)',}

]

const Categories = () => {
  return (
    <div className="section-container py-16  " >
        <div className='text-center'>
            <p className='subtitle'>Customer Favorite</p>
            <h2 className='title '>Our Categories</h2>
        </div>

        {/* categories card */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-4 justify-around items-center mt-12'>
          {
            categoryItems.map((item, i)=>
              (<div key = {i} className= 'shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'   >
                <div className='flex w-full mx-auto items-center justify-center'>
                  <img src={item.image} alt= "" className= 'bg-[#c1f1c6] p-5 rounded-full w-28 h-28' />
                </div>
                <div className= 'mt-5 space-y-1'>
                  <h5>
                    {item.title}
                  </h5>
                  <p> {item.des}</p>                
                </div>

              </div>)
            )
          }
        </div>
      
    </div>
  )
}

export default Categories
