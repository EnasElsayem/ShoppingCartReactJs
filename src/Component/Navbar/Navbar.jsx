import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../asstes/freshcart-logo.svg'
import { CarteContext } from '../../ShareData/CartContext'
export default function Navbar({ userData,logOut}) {

  let {cartData, removeItem, updateQuatity} = useContext(CarteContext)

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} className="w-100" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="home">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="products">Category</NavLink>
            </li>

          </ul> : ""}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData ? <>
              <li className="nav-item py-2">
                <i className='fa-brands fa-facebook mx-2'></i>
                <i className='fa-brands fa-twitter mx-2'></i>
                <i className='fa-brands fa-spotify mx-2'></i>
                <i className='fa-brands fa-youtube mx-2'></i>
              </li>
          
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="profile">profile</NavLink>
              </li>

              <li className="nav-item">
                  <li className='nav-link' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls='offcanvasRight' >
                      <span className='nav-link'>
                  <div className=" position-relative">
                  <i className='fa-solid fa-shopping-cart'></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartData?.numOfCartItems}
                    </span>
                  </div>

                  </span>
                  </li>
                  </li>

              <li className="nav-item">
                <span className='nav-link '  onClick={logOut}>
                  LogOut
                </span>
              </li>
            </> : <>
              
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="login">login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Register</NavLink>
                </li>

              </>
            }


          </ul>

        </div>
      </div>
    </nav>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasRightLabel">cart Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">

            { cartData ? 
            
            cartData.data.products.map((el)=>{
              return <div className='border-dash py-2'>
                <div className="d-flex justify-content-between align-items-center">
                  <img src={el.product.imageCover} className='w-25' height={100} alt="" />

                  <div className='m-auto'>

                     <button className='btn btn-danger btn-sm rounded cusror'
                     onClick={()=> { updateQuatity(el.product._id, el.count -= 1)}}
                     
                     >-</button>
                    <span className='mx-3'>{el.count}</span>
                    <button className='btn btn-success btn-sm rounded cusror'

                      onClick={() => { updateQuatity(el.product._id, el.count += 1) }}

                    >+</button>
                    </div>
                    <div>

                  {/* <i onClick={() =>  removeItem(el.product._id) } className=' fa-solid fa-trash text-danger cusror'</i> */}
                    <i onClick={() => removeItem(el.product._id)} className=' fa-solid fa-trash text-danger cusror' ></i>
                </div>
                </div> 
               <h5 className='py-2'>{el.product.title}</h5>
              </div>
             
             })
            : "" }
           </div>
           <div className='offcanvas-bottm'>
          <Link to="/home" className='btn btn-success w-100'> Add More ITems </Link>
          <Link to={"/checkout/" + cartData?.data?._id} className='btn btn-danger w-100'> CheckOut Payment </Link>

           </div>
         </div>
    
    </>
  )
}
