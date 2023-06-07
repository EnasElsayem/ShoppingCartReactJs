import React, { useContext, useEffect } from 'react'
import { CarteContext } from '../../ShareData/CartContext'
import { Link } from 'react-router-dom'

export default function CartDatails() {
  let { getAllCartData, cartData, removeItem, updataQuatity } = useContext(CarteContext)

  useEffect(()=>{
    getAllCartData()
  },[])

 
  return (
    <div>

      {cartData ? 
      <>

          <table style={{ verticalAlign: 'middle' }} className='table table-striped table-bordered my-3 text-center'>
            <thead>
              <tr>
                <th>image</th>
                <th>name</th>
                <th>quatity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.data.products.map((el) => {
                return <tr>
                  <td>
                    <img src={el.product.imageCover} className='w-75' height={100} alt="" />
                  </td>
                  <td>{el.product.title}</td>
                  <td className='d-flex justify-content-center align-items-center'>

                    <button className='btn btn-danger rounded cusror' onClick={() => { updataQuatity(el.product._id, el.count -= 1) }}>-</button>
                    <span className='mx-3'>{el.count}</span>
                    <button className='btn btn-success rounded cusror' onClick={() => { updataQuatity(el.product._id, el.count += 1) }} >+</button>
                  </td>
                  <td>{el.price}EGP</td>
                  <td>

                    <i onClick={() => removeItem(el.product._id)} className='fa-solid fa-trash text-danger cusror'></i>
                  </td>
                </tr>
              })}
              <tr className='table-danger'>
                <td colSpan={4}>Total</td>
                <td>{cartData.data.totalCartPrice}EGP</td>

              </tr>
            </tbody> 
          </table> 

          <Link to={"/checkout/"+cartData.data._id} className='btn btn-success'>checkOut Payment</Link>
          
          </>
          :""}
          </div>
      
  )}

      
  

