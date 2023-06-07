import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CarteContext = createContext(null)

export function CarteContextProvider(props){
    let baseUrl = "https://route-ecommerce.onrender.com"

    let [cartData, setCartData] = useState()

    useEffect(()=>{
      getAllCartData()
      
    },[])

    async function getAllCartData(){
        let headers = {
            token:localStorage.getItem("token")
        }
       let { data } = await axios.get(`${baseUrl}/api/v1/cart`, { headers});
       console.log(data);
       setCartData(data)
    }

    async function removeItem(id) {
        let headers = {
          token: localStorage.getItem("token"),
        };
         let { data } = await axios.delete(`${baseUrl}/api/v1/cart/${id}`, { headers})
           setCartData(data);

    }

    async function updataQuatity(id, count) {
        let body = {
            count:count
        }
      let headers = {
        token: localStorage.getItem("token"),
      };
      let { data } = await axios.delete(`${baseUrl}/api/v1/cart/${id}`,body , {headers})
      setCartData(data);
      }

    return (
      <CarteContext.Provider
        value={{ cartData, getAllCartData, removeItem, updataQuatity }}
      >
        {props.children}
      </CarteContext.Provider>
    );
}