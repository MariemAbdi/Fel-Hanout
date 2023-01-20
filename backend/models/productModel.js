const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Fill In The Product Name Field'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please Fill In The Product Description Field'],
        trim: true
    },
    category: {
        type: String ,
        required: [true, 'Please Fill In The Product Category Field']
    },
    subcategory: {
        type: String ,
        required: [true, 'Please Fill In The Product Sub-Category Field']
    },
    color: {
        type: String ,
        required: [true, 'Please Fill In The Product Color Field']
    },
    price: {
        type: Number ,
        required: [true, 'Please Fill In The Product Price Field']
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema)