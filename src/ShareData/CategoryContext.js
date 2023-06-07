import axios from 'axios'
import React from 'react'
import { createContext, useEffect, useState } from 'react'



export let CategoryData = createContext(null)
export function CategoryDataProvider(props) {
    // let baseUrl = "https://route-ecommerce.onrender.com"
    let baseUrl = "https://route-ecommerce.onrender.com";
    let [categoryList, setcategyList] = useState([])

    async function getAllCategories() {
        let { data } = await axios.get(`${baseUrl}/api/v1/brands`)
        setcategyList(data.data)
    }
    useEffect(() =>{
        getAllCategories()
    }, [])
    return <CategoryData.Provider value={{categoryList}}>
        {props.children}
    </CategoryData.Provider>
}

