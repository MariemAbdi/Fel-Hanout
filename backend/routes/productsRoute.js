const express = require('express')
const router = express.Router()
const {
    getProductById,getProducts,setProduct,updateProduct,deleteProduct,search
    } = require("../controllers/productController")

router.route('/:id').get(getProductById) //Get One Product By Its Id
router.route('/').get(getProducts).post(setProduct) // Replaces both get and post

router.route('/:id').delete(deleteProduct).put(updateProduct) // Replaces both update and delete

router.route('/search').get(search) //Get One Product By Its Id
module.exports = router