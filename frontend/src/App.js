import {BrowserRouter, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ProductList from "./components/Admin/ProductList"
import AddProduct from "./components/Admin/AddProduct"
import EditProduct from "./components/Admin/EditProduct"
import HomePage from "./components/HomePage/HomePage"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import ProductPage from "./components/HomePage/ProductPage"

function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<ProductList/>} />
        <Route path="/dashboard/add" element={<AddProduct/>} />
        <Route path="/dashboard/edit/:id" element={<EditProduct/>} />
        <Route path="/productPage/:id" element={<ProductPage/>} />
      </Routes>
    </div>
    </BrowserRouter></>
  )
}

export default App
