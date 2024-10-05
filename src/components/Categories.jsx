import axios from 'axios'
import React, { useEffect, useState } from 'react'
import categoriesStyle from "../style/categoriesStyle.module.css"
import electronicsImg from "../images/categories/download (1).jpeg"
import jeweleryImg from "../images/categories/images.jpeg"
import menClothingImg from "../images/categories/download (2).jpeg"
import womenClothingImg from "../images/categories/download (3).jpeg"
import { useContextData } from '../store/useContextData'
import { Link } from 'react-router-dom'

const Categories = () => {
    const[categories,setCategories]=useState([])
    const{dispatch}=useContextData()

    useEffect(()=>{
        dispatch({type:"ADD_LOADER"})
        axios.get("https://fakestoreapi.com/products/categories").then((response)=>{
            setCategories(response.data)
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            dispatch({type:"REMOVE_LOADER"})
        })
    },[dispatch])

  return (
        categories.length
        ?<div className='py-4 px-3'>
        <div className='p-3'>
            <h3 className='text-black  text-center'>Categories</h3>
            <ul className={`d-flex justify-content-center gap-3 p-0 py-2 ${categoriesStyle.bullets}`}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        
        <div className={`${categoriesStyle.all_categories}`}>
            {
            categories.map((ele, index) => {
                let img = ele === "electronics" ? electronicsImg : ele === "jewelery" ? jeweleryImg : ele === "men's clothing" ? menClothingImg : ele === "women's clothing" ? womenClothingImg : null;
                return (
                <div key={index} className={`border position-relative rounded-3 overflow-hidden ${categoriesStyle.categorie_box}`}>
                    <img src={img} alt='Categorie-img' className='w-100 h-100' loading="lazy"/>
                    <p className={`position-absolute text-light fs-5 start-50 translate-middle ${categoriesStyle.title}`}>{ele}</p>
                    <Link to={`/products/category/${ele}`} className={`btn btn-outline-warning position-absolute start-50 translate-middle ${categoriesStyle.btn}`}>Shop now</Link>
                </div>
                )
            })
            }
        </div>
    </div>
        :null
  )
}

export default Categories