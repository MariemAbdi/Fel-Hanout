import {React, useState, useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {toast} from "react-toastify"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Navbar from "./Navbar"
import Footer from "./Footer"

const ProductList = () => {

    const [products, setProduct] = useState([])

    useEffect(()=>{
        getProducts()
    },[])

    //Get All The Products To Display
    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products")
        setProduct(response.data)
        console.log(response.data)
    }

    const Delete = async(id)=>{
        try {
            await axios.delete(`http://localhost:5000/products/${id}`)
            toast.success("Product Deleted Successfully")
            getProducts()
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }
    const deleteProduct = async (id) =>{

        confirmAlert({
            title: 'Confirm To Delete',
            message: 'Are You Sure You Want To Delete This?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    Delete(id)
                }
              },
              {
                label: 'No',
                onClick: () => onclose
              }
            ],
            closeOnEscape: true,
          }); 

    }

    return(
        <>
        <Navbar/>
        <div className="container">
        <div className="columns is-fullwidth">
            <div className="column is-fullwidth">
                <Link to="add" className="button is-success is-rounded has-text-weight-medium mt-5">Add New Product</Link>
                <table className="table is-striped is-fullwidth mt-5">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Category</th>
                            <th>Product Sub-Category</th>
                            <th>Product Color</th>
                            <th>Product Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {products.map((product, index) => (
                         <tr key={product._id}>
                         <td><img className="image"  src={product.image.url}/></td> 
                         <td>{index+1}</td>
                         <td>{product.name}</td>
                         <td>{product.description}</td>
                         <td>{product.category}</td>
                         <td>{product.subcategory}</td>  
                         <td>{product.color}</td>
                         <td>{product.price}</td>
                         <td>
                            <Link to={`edit/${product._id}`} className="button is-info is-small is-rounded has-text-weight-medium mr-3">Edit</Link>
                            <button onClick={()=> deleteProduct(product._id)} className="button is-danger is-rounded is-small has-text-weight-medium">Delete</button>
                         </td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default ProductList