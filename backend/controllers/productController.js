const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const cloudinary = require('../utils/cloudinary')


// GET PRODUCTS
const getProducts = asyncHandler(async (req,res) =>{
    const products = await Product.find().collation({locale: "en"}).sort({name: 1})
    res.status(200).json(products)
})

//GET A PRODUCT
const getProductById = asyncHandler(async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

//Search For Products
const search= asyncHandler(async(req,res)=>{
    const search= req.query.search || ""
    const products = await Product.find({name: {$regex: search, $options: 'i'}})
    res.status(200).json(products)
})


// ADD A PRODUCT
const setProduct = asyncHandler(async (req,res) =>{
    if(!req.body.name)
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Name')

    }else if(!req.body.description)
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Description')

    }else if(req.body.category=="Product Category")
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Category')

    }else if(req.body.subcategory=="Product Sub-Category")
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Sub-Category')

    }else if(!req.body.price)
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Price')

    }else if(req.body.color=="Product Color")
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Color')

    }else if(req.body.price<=0)
    {
        res.status(400)
        throw new Error('Please Add The Product\'s Price')

    }

    const result = await cloudinary.uploader.upload(req.body.image, {folder: "products", crop: "scale"})

    const product = await Product.create({
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        subcategory : req.body.subcategory,
        price : req.body.price,
        color: req.body.color,
        image: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json(product)

})

// UPDATE A PRODUCT
const updateProduct = asyncHandler(async (req,res) =>{

    const product = await Product.findById(req.params.id)

    if(!product)
    {
        res.status(400)
        throw new Error("Product Not Found")
    }
    try {
        if(req.body.image !== ""){
    
            const file = req.files.image
        
            const ImgId = product.image.public_id
        
            if(ImgId){
                await cloudinary.uploader.destroy(ImgId)
            }
        
            const newImage = await cloudinary.uploader.upload(file.tempFilePath,{folder: "products"})
        
            //Add Image To The Data Set
            req.body.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
            }
    } catch (error) {
        res.status(400).json(error)
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true})

    res.status(200).json(updatedProduct)
})

// DELETE A PRODUCT
const deleteProduct = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id)
    if(!product)
    {
        res.status(400)
        throw new Error("Product Not Found")
    }
    
    await cloudinary.uploader.destroy(product.image.public_id)
    await product.remove()

    res.status(200).json({message:`Product ${req.params.id} Deleted Successfully`})
})

module.exports={
    getProductById,
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,search
}