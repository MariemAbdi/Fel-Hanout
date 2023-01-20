import {React, useState, useEffect}from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import {toast} from "react-toastify"
import Navbar from "./Navbar"
import Footer from "./Footer"

const EditProduct = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Product Category")
    const [subcategory, setSubCategory] = useState("Product Sub-Category")
    const [color, setColor] = useState("Product Color")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState([])

    const navigate = useNavigate()

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

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    const editProduct = async(e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/products/${id}`,
            {name:name,
            description:description,
            category:category,
            subcategory:subcategory,
            color:color,
            price:price,
            image:image},config)
            toast.success("Product Updated Successfully "+name)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

  return (
    <>
    <Navbar/>
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <form onSubmit={editProduct} onReset={getProductById} encType="multipart/form-data">
            <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                    <input type="text" className='input' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Product Name'></input>
                </div>
            </div>
            <div className="field">
                <label className="label">Product Description</label>
                <div className="control">
                    <textarea type="text" className='input' value={description} onChange={(e)=> setDescription(e.target.value)} placeholder='Product Description'></textarea>
                </div>
            </div>
            <div className="field">
                <label className="label">Product Category</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                            <option value="Product Category">Product Category</option>
                            <option value="Laptop">Laptop</option>
                            <option value="PC de Bureau">PC de Bureau</option>
                        </select>
                    </div>
                </div>
            </div>
            {category=="Laptop"? <div className="field">
                <label className="label">Product Sub-Category</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select value={subcategory} onChange={(e)=> setSubCategory(e.target.value)}>
                            <option value="Product Category">Product Sub-Category</option>
                            <option value="Laptop Gamer">Laptop Gamer</option>
                            <option value="Laptop Pro">Laptop Pro</option>
                            <option value="Laptop en Promotion">Laptop en Promotion</option>
                        </select>
                    </div>
                </div>
            </div>:
            <div className="field">
            <label className="label">Product Sub-Category</label>
            <div className="control">
                <div className="select is-fullwidth">
                    <select value={subcategory} onChange={(e)=> setSubCategory(e.target.value)}>
                        <option value="Product Category">Product Sub-Category</option>
                        <option value="PC Gamer">PC Gamer</option>
                        <option value="PC Pro">PC Pro</option>
                        <option value="PC en Promotion">PC en Promotion</option>
                    </select>
                </div>
            </div>
        </div>}
            <div className="field">
                <label className="label">Product Color</label>
                <div className="control">
                <div className="select is-fullwidth">
                        <select value={color} onChange={(e)=> setColor(e.target.value)}>
                            <option value="Product Color">Product Color</option>
                            <option value="Black">Black</option>
                            <option value="Gray">Gray</option>
                            <option value="Purple">Purple</option>
                            <option value="Red">Red</option>
                            <option value="Silver">Silver</option>
                            <option value="White">White</option>
                        </select>
                    </div>                
                </div>
            </div>
            <div className="field">
                <label className="label">Product Price</label>
                <div className="control">
                    <input type="number" className='input' value={price} onChange={(e)=> setPrice(e.target.value)} placeholder='Product Price'></input>
                </div>
            </div>

            <div className="field">
                <label className="label">Product Image(s)</label>
                <div className="control">
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" className='input' accept='image/*' name="image"/>
                    <img className="image" src={image.url}/>
                </div>
            </div> 

            <div className="field">
                <div className="control">
                <input type="reset" value="Reset" className="button is-danger is-pulled-left is-rounded has-text-weight-medium"/>
                    <button type="submit" className="button is-pulled-right is-success is-rounded has-text-weight-medium">Save</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default EditProduct