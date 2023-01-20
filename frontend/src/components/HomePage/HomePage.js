import {React, useState, useEffect}from 'react'
import axios from "axios"
import NavBar from "./NavBar"
import Footer from '../Admin/Footer'
import "./homepage.css"
import { BsFillGrid3X2GapFill, BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom'

const HomePage=()=>{

    const [products, setProduct] = useState([])
    const [gridLayout,setGridLayout]= useState(true)
    const [listLayout,setListLayout]= useState()
    const [search, setSearch] = useState();
    const [category, setCategory] = useState("Category");
    const [price, setPrice] = useState("Price");
    
    useEffect(()=>{
        getProducts()
    },[])

    //Get All The Products To Display
    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products")
        setProduct(response.data)
        console.log(response.data)   
    }

    const getFilteredProducts = (search, items)=>{

        //If No Filter Is Selected
        if(!search && category==="Category" && price==="Price"){        
            return products
        }

        //If Only The Price Is Selected
        if(!search && category==="Category" && price!=="Price"){        
            if(price==="ASC"){
                return items.sort((a, b) => a.price - b.price)

            }else{
                return items.sort((a, b) => b.price - a.price)
            }
        }

        //If Only The Search Is Selected
        if(search && category==="Category" && price==="Price"){
            return items.filter((p)=> p.name.toLowerCase().includes(search.toLowerCase()))
        }

        //If Only The Category Is Selected
        if(!search && category!=="Category" && price==="Price"){
            return items.filter((p)=> p.category===category)
        }

        //If Category And Price Are Selected
        if(!search && category!=="Category" && price!=="Price"){
            if(price==="ASC"){
                return items.filter((p)=> p.category===category).sort((a, b) => a.price - b.price)

            }else{
                return items.filter((p)=> p.category===category).sort((a, b) => b.price - a.price)
            }
        }

        //If Category And Search Are Selected
        if(search && category!=="Category" && price==="Price"){
            return items.filter((p)=> p.name.toLowerCase().includes(search.toLowerCase()) && p.category===category)

        }

        //If Search And Price Are Selected
        if(search && category==="Category" && price!=="Price"){
            if(price==="ASC"){
                return items.filter((p)=>  p.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.price - b.price)

            }else{
                return items.filter((p)=>  p.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.price - a.price)
            }
        }



        //If Something Is Typed A Category Is Chosen And Price
        if(search && category!=="Category" && price!=="Price")
        {            
            if(price==="ASC"){
                return items.filter((p)=> p.name.toLowerCase().includes(search.toLowerCase()) && p.category===category).sort((a, b) => a.price - b.price)

            }else{
                return items.filter((p)=> p.name.toLowerCase().includes(search.toLowerCase()) && p.category===category).sort((a, b) => b.price - a.price)
            }
        }
        
    
    }

    const filteredProducts = getFilteredProducts(search,products)
    
    const gridLayoutOn = event => {
        setGridLayout(true);
        setListLayout(false)
      };

    const listLayoutOn = event => {
        setGridLayout(false);
        setListLayout(true)
      };


    return(
        <>
        <NavBar/>
        <div className='container'>
            <h1 className='has-text-centered has-text-black mt-5 has-text-weight-bold is-size-1 mb-5'>All The Products</h1>

           <div className='parent'>
           <div className='child'>
                <div className="control ">
                    <input type="text" className='input' onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." required/>
                </div>
                </div>
            
            <div className="control child">
                    <div className="select">
                        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                            <option value="Category">Product Category</option>
                            <option value="Laptop">Laptop</option>
                            <option value="PC de Bureau">PC de Bureau</option>
                        </select>
                    </div>
                    </div>
                    <span className='mr-5 has-text-danger' onClick={(e)=> setCategory("Category")}>X Clear Categories</span>

                    <div className="control child">
                    <div className="select">
                        <select value={price} onChange={(e)=> setPrice(e.target.value)}>
                            <option value="Price">Price</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>
                    </div>

                    <div className='is-pulled-right child'><BsFillGrid3X2GapFill size={30} className='mr-3' onClick={gridLayoutOn}/><BsList size={30} onClick={listLayoutOn}/></div>

           </div>

                


            {gridLayout && <ul className="grid_list mt-5">
            {filteredProducts.map((product, index) => (
                     <div key={product._id} className="mt-5">
                     <Link to={`productPage/${product._id}`} className="link">
                     <img className='image' src={product.image.url}/>
                     <h1><b>{product.name}</b></h1>
                     <h3>{product.description}</h3>
                     <h3><b>Category: </b>{product.category}</h3>
                     <h3><b>SubCategory:</b>{product.subcategory}</h3>  
                     <h3><b>Color:</b> {product.color}</h3>
                     <h3><b>{product.price} TND</b></h3>
                     </Link>
                    </div>
                   ))}</ul>}

                   
            {listLayout && 
            <table className="table is-striped is-fullwidth mt-5">
            {filteredProducts.map((product, index) => (
                     <tr key={product._id} className="mb-5">
                     <Link to={`productPage/${product._id}`} className="link">
                     <td><img className="my_image"  src={product.image.url}/></td>
                     <td><h1><b>{product.name}</b></h1>
                     <h3>{product.description}</h3>
                     <h3><b>Category: </b>{product.category}</h3>
                     <h3><b>SubCategory:</b>{product.subcategory}</h3>  
                     <h3><b>Color:</b> {product.color}</h3>
                     <h3><b>{product.price} TND</b></h3></td>
                     </Link>
                    </tr>
                   ))}</table>}
        </div>
        <Footer/>
        </>
    )
}

export default HomePage