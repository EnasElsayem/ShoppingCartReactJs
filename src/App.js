import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
  // Provider,
} from "react-router-dom";
// import { Provider } from 'react';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Products from './Component/Products/Products';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import NotFound from './Component/NotFound/NotFound';
import Profile from './Component/Profile/Profile';
import jwt_decode from "jwt-decode"
import ProtectedRouting from './ProtectedRouting';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetPassword from './Component/ForgetPassword/ResetPassword';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Category from './Component/Category/Category';
import { CarteContextProvider } from './ShareData/CartContext';
import CartDatails from './Component/CartDatails/CartDatails';
import Checkout from './Component/Checkout/Checkout';


export default function App() {


  let [userData, setUserData] = useState(null)


  useEffect(() => {

    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")

      let data = jwt_decode(token)//{id:na}
      saveUserData(data)
    }
  }, [])

  function saveUserData(data) {
    setUserData(data)
  }

  function logOut() {
    setUserData(null)
    localStorage.removeItem("token")
    return <Navigate to='/login' />
  }

  function ProtectedRouting2(props){
    if(localStorage.getItem("token") != null ){
      return <Navigate to="/home" />
    } else {
      return props.children;
    }
  }

  let store 

  let routes = createHashRouter([
    {
      path: "",
      element: <Layout logOut={logOut} userData={userData} />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRouting>
              <Products />
            </ProtectedRouting>
          ),
        },
        // {
        //   path: "products",
        //   element: (
        //     <ProtectedRouting>
        //       <Products />
        //     </ProtectedRouting>
        //   ),
        // },
        {
          path: "Category",
          element: (
            <ProtectedRouting>
              <Category />
            </ProtectedRouting>
          ),
        },

        {
          path: "CartDatails",
          element: (
            <ProtectedRouting>
              <CartDatails />
            </ProtectedRouting>
          ),
        },

        {
          path: "Checkout/:cartId",
          element: (
            <ProtectedRouting>
              <Checkout />
            </ProtectedRouting>
          ),
        },

        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRouting>
              <ProductDetails />
            </ProtectedRouting>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRouting>
              <Profile userData={userData} />
            </ProtectedRouting>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        {
          index: true,
          element: (
            <ProtectedRouting2>
              {" "}
              <Register />
            </ProtectedRouting2>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    // <Provider store={store}>
      <CarteContextProvider>
        <RouterProvider router={routes} />
      </CarteContextProvider>
    //  </Provider>
  );
}
