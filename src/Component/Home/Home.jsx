import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Category from '../Category/Category'
import MainSlider from '../MainSlider/MainSlider'
import $ from 'jquery'
// import { product } from './../Interfaces/Product';
export default function Home() {
  let baseUrl = "https://route-ecommerce.onrender.com"
  let [ProductList, setProduct] = useState([])


  useEffect(() => {

    getAllProducts()
  }, [])
  async function getAllProducts() {
    let { data } = await axios.get(`${baseUrl}/api/v1/products`)

    console.log(data.data);
    setProduct(data.data)

    $(".loading").fadeOut(2000)
  }
  return (
    <>

      <MainSlider />
      <Category />

      <div className='position-fixed top-0 end-0 bg-info start-0 bottom-0 loading'>
        <i className='fa-solid fa-spinner fa-spin fa-4x'></i>
      </div>
      <div className='row g-3 mt-5'>


        {ProductList.map((product) => {
          return <div key={product._id} className='col-md-2 product'>
            <Link to={"/ProductDetails/" + product._id}>
              <div className=' border'>
                <img src={product.imageCover} className='w-100' alt="" />
                <span className='text-success'>{product.category.name}</span>
                <h2 className='h6 fw-bold'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
                <div className='d-flex justify-content-between'>
                  <p>{product.price}EGP</p>
                  <div className=''>
                    <i className='fa-solid fa-star text-warning'></i>{product.ratingsAverage}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })}

      </div>
    </>
  )
}
