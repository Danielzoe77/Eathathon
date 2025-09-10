import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from '../components/Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    > NEXT </div>
  );
}

const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    > BACK </div>
  );
}



const SpecialDishes = () => {
  const [recipe, setRecipe] = useState([]);
  const slider = React.useRef(null)

  useEffect(() =>{
        fetch("https://foodie-backend-umhd.onrender.com/menu").then(res =>res.json()).then(data =>{
          // console.log(data)
          // filter the data that will be displayed
          const specials = data.filter((product) =>
            product.category === "popular"
          )
          // const specials = data; // all products
          
          // console.log(specials)
          setRecipe(specials)
        }); 
  }, [])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow : <simpleNextArrow />,
        prevArrow : <simplePrevArrow />
      };
  return (
    <div className='section-container my-20 relative'>
      <div className='text-left'>
            <p className='subtitle'>Special Dishes</p>
            <h2 className='title md:w-[520px] '>Standout Dishes From our menu</h2>

        </div>

        {/* arrow btn */}
        <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
          <button onClick={()=>slider?.current?.slickPrev()} className='btn p-2 rounded-full ml-5  bg-green'>
            <FaAngleLeft className='w-8 h-8 p-1 ' />
          </button>
          <button onClick={()=>slider?.current?.slickNext()} className='btn p-2 rounded-full mr-5  bg-green' >
            <FaAngleRight  className='w-8 h-8 p-1 '/>
          </button>
        </div>


        {/* <Slider ref={slider} {...settings} className='overflow-hidden mt-10'>
        {

          
          recipe.map((item,i)=>(
            <Card key={i}  item={item} />
          ))
        }
     
      </Slider> */}
    <Slider ref={slider} {...settings} className="overflow-hidden mt-10">
  {recipe.map((item, i) => (
    <div key={i} className="px-3">   {/* <-- add horizontal padding */}
      <Card item={item} />
    </div>
  ))}
</Slider>

      
    </div>
  )
}

export default SpecialDishes
