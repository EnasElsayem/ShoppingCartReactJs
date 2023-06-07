import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function ProductDetails() {
    let { id } = useParams()
    console.log(id);
    let navgiate = useNavigate()
    let baseUrl = "https://route-ecommerce.onrender.com"
    let [ProductDetail, setProductDetail] = useState()


    useEffect(() => {

        getProductDetails()
    }, [])
    async function getProductDetails() {
        let { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`)
        console.log(data.data);
        setProductDetail(data.data)
        (".loading").fadeOut(2000)
    }

    async function addItemCart(id) {

        let body = {
            productId: id 
        }
        let headers = {
            token: localStorage.getItem("token"),
        }
        let { data } = await axios.post(`${baseUrl}/api/v1/cart`, body, {
            headers
        })

        if(data.status == "success"){
            // navg to cart Details
            navgiate('/CartDatails')
        }
        console.log(data);
    }

    return (
        <div>
            {ProductDetail ? <div className='row align-items-center'>
                <div className='col-md-4 '>
                    <OwlCarousel className='owl-theme'  loop items={1}>
                        {ProductDetail.images.map((el) => {
                            return <div >
                                <img  src={el} />
                            </div>
                        })}
                    </OwlCarousel>
        
                </div>
                <div className='col-md-8 '>
                    <h2>{ProductDetail.title}</h2>
                    <p className='text-muted'>{ProductDetail.description}</p>
                    <span className='text-success'>{ProductDetail.category.name}</span>
                    <div className='d-flex justify-content-between'>
                        <p>{ProductDetail.price}EGP</p>
                        <div className=''>
                            <i className='fa-solid fa-star text-warning'></i>{ProductDetail.ratingsAverage}
                        </div>
                    </div>
                    <button onClick={()=>addItemCart(ProductDetail._id)} className='btn btn-success w-100'> + Add Cart</button>
                </div>
            </div> : ""}

        </div>
    )
}
