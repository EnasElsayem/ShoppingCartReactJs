
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { category } from './../Interfaces/categoy';
export default function Category() {
  let baseUrl = "https://route-ecommerce.onrender.com"
  let [categoriesList, setCategories] = useState([])


  useEffect(() => {

    getAllProducts()
  }, [])
  async function getAllProducts() {
    let { data } = await axios.get(`${baseUrl}/api/v1/categories`)
    console.log(data.data);
    setCategories(data.data)
  }
  return (
    <div>

      <OwlCarousel className='owl-theme' autoplay={true} autoplayaTimeout={1000} dots={false} loop items={7}>
        {categoriesList.map((el) => {
          return <div className='imgItem1'>
            <img height={150} src={el.image} />
          </div>
        })}
      </OwlCarousel> 
      <OwlCarousel className='owl-theme' autoplay={true} autoplayaTimeout={1200} loop items={7}>
        {categoriesList.map((el) => {
          return <div  className='imgItem2'>
            <img height={150} src={el.image} />
            <h6>{el.name}</h6>
          </div>
        })}
      </OwlCarousel> 
    </div>
  )
}
