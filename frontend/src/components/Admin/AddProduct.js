import {React, useState}from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import Navbar from './Navbar'
import Footer from './Footer'

const AddProduct = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Product Category")
    const [subcategory, setSubCategory] = useState("Product Sub-Category")
    const [color, setColor] = useState("Product Color")
    const [price, setPrice] = useState()
    const [image, setImage] = useState([]);

    const navigate = useNavigate()

    const resetFields = ()=>{
        setName("")
        setDescription("")
        setCategory("Product Category")
        setSubCategory("Product Sub-Category")
        setColor("Product Color")
        setPrice(1)
        setImage([])
    }

    //handle and convert image in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }
    }

    //Save The Product
    const saveProduct = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/products',{
                name,
                description,
                category,
                subcategory,
                price,
                color,
                image
            })
            toast.success("Product Added Successfully")
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }


  return (
    <>
    <Navbar/>
    <div className='container'>
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <form onSubmit={saveProduct} onReset={resetFields} encType="multipart/form-data">
            <div className="field">
                <label className="label">Product Name</label>
                <div className="control">
                    <input type="text" className='input' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Product Name' required></input>
                </div>
            </div>
            <div className="field">
                <label className="label">Product Description</label>
                <div className="control">
                    <textarea type="text"className='input' value={description} onChange={(e)=> setDescription(e.target.value)} placeholder='Product Description' required></textarea>
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
                        <select value={color} onChange={(e)=> setColor(e.target.value)} required>
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
                    <input type="number" className='input' min={1} value={price} onChange={(e)=> setPrice(e.target.value)} placeholder='Product Price' required></input>
                </div>
            </div>

            <div className="field">
                <label className="label">Product Image(s)</label>
                <div className="control">
                    <input onChange={handleImage} type="file" className='input' accept='image/*' name="image" required/>
                    {image===""?<label className="">Your Image Will Show Here...</label>:<img className="image" src={image} alt="" />}
                </div>
            </div>            

            <div className="field">
                <div className="control">
                    <input type="reset" value="Reset" className="button is-danger is-pulled-left is-rounded has-text-weight-medium"/>
                    <button type="submit" className="button is-success is-pulled-right is-rounded has-text-weight-medium">Save</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default AddProduct