import {React, useState, useEffect}from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import {toast} from "react-toastify"
import NavBar from "./NavBar"
import Footer from '../Admin/Footer'

const ProductPage = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Product Category")
    const [subcategory, setSubCategory] = useState("Product Sub-Category")
    const [color, setColor] = useState("Product Color")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState([])


    const {id} = useParams()

    useEffect(()=>{
        getProductById()
    },[])

    const getProductById = async() =>{
        const response = await axios.get(`http://localhost:5000/products/${id}`)
        setName(response.data.name)
        setDescription(response.data.description)
        setCategory(response.data.category)
        setSubCategory(response.data.subcategory)
        setColor(response.data.color)
        setPrice(response.data.price)
        setImage(response.data.image)
    }


  return (
    <>
    <NavBar/>
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <div className='container'>

            <img className="image" src={image.url}/>

            <h1 className='has-text-centered mt-5 has-text-black has-text-weight-bold is-size-1 mb-5'>{name}</h1>

            <label className="label has-text-link">Product Description</label>
            <h2 className='has-text-justified mt-3 has-text-weight-semibold is-size-5'>{description}</h2>


            <label className="label mt-5 has-text-link">Product Category</label>
            <h2 className='has-text-justified has-text-weight-semibold is-size-6'>{category}</h2>


            <label className="label mt-5 has-text-link">Product Subcategory</label>
            <h2 className='has-text-justified has-text-weight-semibold is-size-6'>{subcategory}</h2>

            <div className='is-pulled-left mt-5'>
            <label className="label has-text-link">Product Color</label>
            <h2 className='has-text-left mt-3 has-text-weight-semibold is-size-6'>{color}</h2>
            </div>

            <div className='is-pulled-right mt-5'>
            <label className="label has-text-link">Product Price</label>
            <h2 className='has-text-right  mt-3 has-text-weight-semibold is-size-6'>{price} TND</h2>
            </div>

            
           
           

            
           
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductPage