import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true, // Para no tener 2 productos con el mismo nombre
    },

    available: { // si está disponible o no
        type: Boolean,
        default: false,
    },

    price: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
    },

    user: { // quien fue el usuario que lo creó
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Hace referencia a la colección de usuarios
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', // Hace referencia a la colección de categorías
        required: true,
    }

});

// Aca se configura el comportamiento del schema para que no muestre ciertos campos en el response de la API (POSTMAN)
productSchema.set('toJSON', { // .set sirve para modificar el comportamiento de un schema
    virtuals: true, // Para que se muestre el id 
    versionKey: false, // Para que no se muestre el __v
    transform: function (_doc, ret, options) { 
        delete ret._id  // Para que no se muestre el _id
    },
    
})

export const productModel = mongoose.model('Product', productSchema);
